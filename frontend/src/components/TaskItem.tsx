import { FaTrash } from "react-icons/fa";
import { useTaskStore } from "../stores/useTaskStores";

interface TaskProps {
  task: { id: number; title: string; completed: boolean };
}

const TaskItem = ({ task }: TaskProps) => {
  const { toggleTask, removeTask } = useTaskStore();

  return (
    <li className="flex items-center justify-between border-b py-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <span className={`${task.completed ? "line-through text-gray-400" : ""}`}>
          {task.title}
        </span>
      </div>
      <button onClick={() => removeTask(task.id)} className="text-red-500 hover:text-red-700">
        <FaTrash />
      </button>
    </li>
  );
};

export default TaskItem;
