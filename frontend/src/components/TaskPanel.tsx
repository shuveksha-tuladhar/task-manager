import React from "react";
import {
  FaTrashAlt,
  FaSun,
  FaPaperclip,
  FaPlus,
  FaAngleRight,
} from "react-icons/fa";
import { Step, TaskType } from "./types/TaskType";
import { TaskPanelProps } from "./types/TaskPanelProps";
import { useTaskStore } from "../stores/useTaskStore";
import useGlobalStore from "../stores/useGlobalStore";
import { patchApi } from "../util/api";
import CheckableLabelItem from "./CheckableLabelItem";
import { useTaskStepStore } from "../stores/useTaskStepStore";

const TaskPanel: React.FC<TaskPanelProps> = ({ task, onDelete, onClose }) => {
  const { addToast } = useGlobalStore();
  const {
    editTask,
    setEditingTask,
    editingTaskId,
    toggleFieldValue,
  } = useTaskStore();

  const {
    stepInput,
    setStepInput,
    editingStepId,
    setEditingStep,
    toggleStepComplete,
    updateSteps,
    removeStep,
  } = useTaskStepStore();

  if (!task) return null;

  const isEditingTask = editingTaskId === task._id;

  const completeTask = () => {
    patchApi<TaskType>("/api/tasks/" + task._id, {
      completed: !task.completed,
    })
      .then((res) => {
        if (res.data) {
          toggleFieldValue(task._id, "completed");
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
          toggleFieldValue(task._id, "isStarred");
        }
      })
      .catch((error) => {
        console.error(error);
        addToast({ message: "Error updating task importance", type: "error" });
      });
  };

  const handleEdit = (newTitle: string) => {
    if (newTitle.trim() && newTitle !== task.title) {
      patchApi<TaskType>("/api/tasks/" + task._id, {
        title: newTitle,
      })
        .then((res) => {
          if (res.data) {
            editTask(task._id, newTitle);
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

  const completeStepForTask = (stepId?: string) => {
    if (!stepId) return;

    const updatedSteps = task.steps?.map((step) =>
      step._id === stepId ? { ...step, completed: !step.completed } : step
    );

    patchApi<TaskType>("/api/tasks/" + task._id, {
      steps: updatedSteps,
    })
      .then((res) => {
        if (res.data) {
          toggleStepComplete(task._id, stepId);
        }
      })
      .catch((error) => {
        console.error(error);
        addToast({ message: "Error updating task step", type: "error" });
      });
  };

  const handleAddStep = () => {
    if (stepInput.trim()) {
      console.log("New step added");
      setStepInput("");

      patchApi<TaskType>("/api/tasks/" + task._id, {
        steps: [
          ...(task?.steps ?? []),
          { title: stepInput, completed: false } as Step,
        ],
      })
        .then((resp) => {
          if (resp.data) {
            updateSteps(task._id, resp.data.steps ?? []);
          } else {
            addToast({ message: "Error adding step", type: "error" });
          }
        })
        .catch((error) => {
          console.error(error);
          addToast({ message: "Error adding step", type: "error" });
        });
    }
  };

  const handleRemoveStep = (stepId?: string) => {
    if (!stepId) return;
    const updatedSteps = task.steps?.filter((step) => step._id !== stepId);

    patchApi<TaskType>("/api/tasks/" + task._id, {
      steps: updatedSteps,
    })
      .then((resp) => {
        if (resp.data) {
          removeStep(task._id, stepId);
        } else {
          addToast({ message: "Error deleting step", type: "error" });
        }
      })
      .catch((error) => {
        console.error(error);
        addToast({ message: "Error deleting step", type: "error" });
      });
  };

  const handleStepEdit = (stepId: string | null, newTitle: string) => {
    if (!task || !task.steps) return;

    const currentStep = task.steps.find((step) => step._id === stepId);
    if (!currentStep) return;

    if (newTitle.trim() && newTitle !== currentStep.title) {
      const updatedSteps = task.steps.map((step) =>
        step._id === stepId ? { ...step, title: newTitle } : step
      );

      patchApi<TaskType>("/api/tasks/" + task._id, {
        steps: updatedSteps,
      })
        .then((res) => {
          if (res.data) {
            updateSteps(task._id, res.data.steps ?? []);
          } else {
            addToast({ message: "Error updating step title", type: "error" });
          }
          setEditingStep(null);
        })
        .catch((error) => {
          console.error(error);
          addToast({ message: "Error updating step title", type: "error" });
          setEditingStep(null);
        });
    } else {
      setEditingStep(null);
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
                  onComplete={() => completeStepForTask(step._id)}
                  onLabelClick={() => setEditingStep(step._id ?? null)}
                  isEditing={step._id === editingStepId}
                  onLabelChange={(newLabel: string) =>
                    handleStepEdit(step._id ?? null, newLabel)
                  }
                  onDelete={() => handleRemoveStep(step._id)}
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
              value={stepInput}
              onChange={(e) => setStepInput(e.target.value)}
              placeholder="Add step"
              onKeyDown={(e) => e.key === "Enter" && handleAddStep()}
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
