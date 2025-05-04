import { FaRegStar, FaStar, FaCheck } from "react-icons/fa";
import { useTaskStore } from "../stores/useTaskStores";
import { patchApi } from "../util/api";
import useGlobalStore from "../stores/useGlobalStore";
import { TaskType } from "./types/TaskType";
import { TaskProps } from "./types/TaskProps";
import { useListStore } from "../stores/useListStores";
import { ListEnum } from "./types/ListEnum";

const TaskItem = ({ task }: TaskProps) => {
  const { addToast } = useGlobalStore();
  const { activeList } = useListStore();
  const { toggleComplete, setActiveTaskId, toggleImportant } = useTaskStore();

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

  return (
    <>
      <li className="flex items-center justify-between bg-white p-3 rounded-md  hover:shadow-sm transition-shadow">
        <div className="flex items-center gap-3 w-full">
          <label className="relative inline-flex items-center justify-center w-5 h-5">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => completeTask()}
              className="peer w-5 h-5 rounded-full border-2 border-gray-500 bg-white checked:bg-indigo-500 checked:border-indigo-500 appearance-none cursor-pointer"
            />
            <FaCheck className="absolute text-white text-xs opacity-0 peer-checked:opacity-100 pointer-events-none" />
          </label>
          <span
            className={`text-base flex-grow truncate text-sm ${
              task.completed ? "line-through text-gray-400" : "text-gray-800"
            } cursor-pointer hover:text-black`}
            onClick={() => setActiveTaskId(task._id)}
          >
            {task.title}
          </span>
        </div>

        <div className="flex gap-1 ml-2">
          <button
            onClick={() => toggleImportantTask()}
            className="btn btn-ghost btn-xs"
            title="Mark Important"
            disabled={
              activeList?.name === ListEnum.Important &&
              activeList._id === task.listId
            }
          >
            {!task.isStarred ? (
              <FaRegStar className="text-gray-500" />
            ) : (
              <FaStar className="text-gray-500" />
            )}
          </button>
        </div>
      </li>
    </>
  );
};

export default TaskItem;
