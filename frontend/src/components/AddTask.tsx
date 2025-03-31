import { FaPlus } from "react-icons/fa";
import { useTaskStore } from "../stores/useTaskStores";

const AddTask: React.FC = () => {
  const { taskInput, setTaskInput, addTask } = useTaskStore();
  
  return (
    <div className="flex gap-2 my-4">
      <input
        type="text"
        placeholder="Add a task..."
        className="input input-bordered flex-1"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button className="btn btn-primary" onClick={addTask} disabled={!taskInput.trim()}>
        <FaPlus />
      </button>
    </div>
  );
};

export default AddTask;
