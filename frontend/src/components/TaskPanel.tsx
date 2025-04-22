import React, { useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaTrashAlt,
  FaSun,
  FaPaperclip,
} from "react-icons/fa";
import { TaskType as Task, Step } from "./types/TaskType";

interface TaskPanelProps {
  task: Task | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const TaskPanel: React.FC<TaskPanelProps> = ({ task, onDelete }) => {
  const [steps, setSteps] = useState<Step[]>(task?.steps || []);
  const [newStep, setNewStep] = useState("");

  if (!task) return null;

  const handleAddStep = () => {
    if (newStep.trim()) {
      setSteps([...steps, { title: newStep, completed: false }]);
      setNewStep("");
    }
  };

  const handleRemoveStep = (index: number) => {
    const updated = [...steps];
    updated.splice(index, 1);
    setSteps(updated);
  };

  return (
    <div className="right-0 top-0 h-full w-[26rem] bg-base-100 z-50 flex flex-col shadow-lg">
      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        {/* Title */}
        <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={task.completed}
          onChange={() => console.log('Completed')}
        />
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <button className="text-yellow-500 text-lg">
            {task.isStarred ? <FaStar /> : <FaRegStar />}
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          <ul className="space-y-2">
            {steps.map((step, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-base-200 p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={step.completed} readOnly className="checkbox checkbox-sm" />
                  <span className={step.completed ? "line-through text-gray-500" : ""}>
                    {step.title}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveStep(index)}
                  className="text-gray-400 hover:text-red-600"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button onClick={handleAddStep} className="btn btn-sm btn-outline btn-primary">
              + Step
            </button>
            <input
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              placeholder="Enter step"
              className="input input-sm input-bordered w-full"
            />
          </div>
        </div>

        {/* Task Options */}
        <div className="space-y-3">
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
        </div>

        {/* Notes */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Add note</p>
          <textarea
            className="textarea textarea-bordered w-full text-sm"
            rows={3}
            placeholder="Write a note..."
          ></textarea>
           <p className="text-xs text-gray-400">Updated 2 hours ago</p>
        </div>
      </div>

      <div className="px-4 py-3 bg-base-200 rounded-b-lg flex items-center justify-between text-xs text-gray-500 shadow-inner">
        <span>Created Yesterday</span>
        <button onClick={() => onDelete(task._id)} className="text-red-600 hover:text-red-800">
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

const OptionRow: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    <div className="text-gray-600">{icon}</div>
    <span>{label}</span>
  </div>
);

export default TaskPanel;
