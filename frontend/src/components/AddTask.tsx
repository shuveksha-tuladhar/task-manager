import { FaPlus } from "react-icons/fa";
import { useTaskStore } from "../stores/useTaskStores";
import { useListStore } from "../stores/useListStores";
import { postApi } from "../util/api";
import { TaskType } from "./types/TaskType";
import useToastStore from "./Toast/types/useToastStore";

const AddTask: React.FC = () => {
  const { taskInput, setTaskInput, addTask } = useTaskStore();
  const { activeList } = useListStore();
  const { addToast } = useToastStore();

  const handleAddTask = () => {
    postApi<TaskType>("/api/tasks", {
      title: taskInput,
      listId: activeList?._id,
      userId: "67e70326de9957df819ceb17", // TODO: use the logged user ID
      assignedToUserId: "67e70326de9957df819ceb17", // TODO: use the logged user ID
    })
      .then((res) => {
        if (res.data) {
          const taskData = res.data;
          const filteredData: TaskType = {
            _id: taskData._id,
            title: taskData.title,
            completed: taskData.completed,
            listId: taskData.listId,
            isStarred: taskData.isStarred,
            priority: taskData.priority,
          };
          addTask(filteredData);
          addToast({ message: "Task added successfully", type: "success" });
        } else {
          console.error(res.error);
          addToast({ message: res.error.message, type: "error" });
        }
      })
      .catch((error) => {
        console.error(error);
        addToast({ message: error.message, type: "error" });
      });
  };

  return (
    <div className="flex gap-2 my-4">
      <input
        type="text"
        placeholder="Add a task..."
        className="input input-bordered flex-1"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button
        className="btn btn-primary"
        onClick={handleAddTask}
        disabled={!taskInput.trim()}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default AddTask;
