import React, { useState } from "react";
import {
  FaTrashAlt,
  FaSun,
  FaPaperclip,
  FaPlus,
  FaAngleRight,
} from "react-icons/fa";
import { TaskType } from "./types/TaskType";
import { TaskPanelProps } from "./types/TaskPanelProps";
import { useTaskStore } from "../stores/useTaskStores";
import useGlobalStore from "../stores/useGlobalStore";
import { patchApi } from "../util/api";
import CheckableLabelItem from "./CheckableLabelItem";

const TaskPanel: React.FC<TaskPanelProps> = ({ task, onDelete, onClose }) => {
  const { addToast } = useGlobalStore();
  const {
    editTask,
    setEditingTask,
    editingTaskId,
    toggleImportant,
    toggleComplete,
  } = useTaskStore();

  const [newStep, setNewStep] = useState("");

  if (!task) return null;

  const isEditingTask = editingTaskId === task._id;

  const completeTask = () => {
    patchApi<TaskType>("/api/tasks/" + task._id, {
      completed: !task.completed,
    })
      .then((res) => {
        if (res.data) {
          toggleComplete(task._id);
        }
      })
      .catch((error) => {
        console.error(error);
        addToast({ message: "Error updating task", type: "error" });
      });
  };

  const toggleImportantTask = () => {
    patchApi<TaskType>("/api/tasks/" + task._id, {
      isStarred: !task.isStarred,
    })
      .then((res) => {
        if (res.data) {
          toggleImportant(task._id);
        }
      })
      .catch((error) => {
        console.error(error);
        addToast({ message: "Error updating task importance", type: "error" });
      });
  };

  const handleAddStep = () => {
    if (newStep.trim()) {
      console.log("New step added");
      setNewStep("");
    }
  };

  const handleRemoveStep = (index: number) => {
    console.log("Handle remove step:", index);
  };

  const handleEdit = (newTitle: string) => {
    if (newTitle.trim() && newTitle !== task.title) {
      patchApi<TaskType>("/api/tasks/" + task._id, {
        title: newTitle,
      })
        .then((res) => {
          if (res.data) {
            editTask(task._id, newTitle);
            addToast({
              message: "Title updated successfully",
              type: "success",
            });
          } else {
            addToast({ message: "Error updating title", type: "error" });
          }
          setEditingTask(null);
        })
        .catch((error) => {
          console.error(error);
          addToast({ message: "Error updating title", type: "error" });
          setEditingTask(null);
        });
    } else {
      setEditingTask(null);
    }
  };

  return (
    <div className="h-full w-[26rem] bg-neutral-50 shadow-lg flex flex-col">
      <div className="p-4 grow overflow-y-auto space-y-6">
        <CheckableLabelItem
          key={task._id}
          label={task.title}
          checked={task.completed}
          onComplete={completeTask}
          isStarred={task.isStarred}
          onToggleStarred={toggleImportantTask}
          isEditing={isEditingTask}
          onLabelClick={() => setEditingTask(task._id)}
          onLabelChange={(newLabel: string) => handleEdit(newLabel)}
        />

        <div className="space-y-2">
          <ul className="space-y-2">
            {task.steps?.map((step, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-base-200 p-3 rounded-lg shadow-sm"
              >
                <CheckableLabelItem
                  key={step._id}
                  label={step.title}
                  checked={step.completed}
                  onComplete={() => console.log("Steps completed")}
                  onLabelChange={(newLabel: string) =>
                    console.log("Label changed to:", newLabel)
                  }
                  onDelete={() => handleRemoveStep(index)}
                />
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 bg-white pl-2">
            <button
              onClick={handleAddStep}
              className="flex items-center gap-1 text-blue-600 hover:underline focus:outline-none bg-white"
            >
              <FaPlus className="text-xs text-indigo-400" />
            </button>
            <input
              type="text"
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              placeholder="Add step"
              className="input border-none w-full focus:outline-none"
            />
          </div>
        </div>
        <ul className="space-y-1 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white overflow-hidden px-4">
          <OptionRow icon={<FaSun />} label="Add to My Day" />

          {/* <div className="flex items-center justify-between p-3 rounded-lg bg-base-200 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded">SVG</div>
              <div>
                <p className="font-medium text-sm">6625275_3346987.svg</p>
                <span className="text-xs text-gray-500">35.6KB · File</span>
              </div>
            </div>
          </div> */}
          <OptionRow icon={<FaPaperclip />} label="Add file" />
        </ul>
        <div>
          <textarea
            className="textarea textarea-bordered w-full text-sm resize-none"
            rows={2}
            placeholder="Add Note"
          ></textarea>
          {/* <p className="text-xs text-gray-400">Updated 2 hours ago</p> */}
        </div>
      </div>

      <div className="px-4 py-3 bg-base-200 rounded-b-lg flex items-center justify-between text-xs text-gray-500 shadow-inner">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-800 text-left cursor-pointer"
        >
          <FaAngleRight />
        </button>
        <span className="text-center w-full">Created Yesterday</span>
        <button
          onClick={() => onDelete(task._id)}
          className="text-gray-400 hover:text-red-800 text-right cursor-pointer"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

const OptionRow: React.FC<{ icon: React.ReactNode; label: string }> = ({
  icon,
  label,
}) => (
  <li className="flex items-center py-3 cursor-pointer hover:bg-gray-50 transition">
    <div className="text-gray-400 me-3 text-sm">{icon}</div>
    <span className="text-gray-400 text-sm">{label}</span>
  </li>
);

export default TaskPanel;
