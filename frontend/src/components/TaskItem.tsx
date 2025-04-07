import { FaTrash, FaEdit, FaSave, FaRegStar, FaStar } from "react-icons/fa";
import { useTaskStore } from "../stores/useTaskStores";
import { patchApi } from "../util/api";
import useToastStore from "./Toast/types/useToastStore";

interface TaskProps {
  task: { _id: string; title: string; completed: boolean; isStarred: boolean };
}

const TaskItem = ({ task }: TaskProps) => {
  const { addToast } = useToastStore();
  const { toggleComplete, removeTask, editTask, setEditingTask, editingTaskId, toggleImportant } =
    useTaskStore();
  const isEditing = editingTaskId === task._id;

  const handleEdit = (newTitle: string) => {
    if (newTitle.trim()) {
      editTask(task._id, newTitle);
    }
  };

  const completeTask = () => {
    patchApi("/api/tasks/" + task._id, {
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
    patchApi("/api/tasks/" + task._id, {
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
    <li className="flex items-center justify-between bg-base-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 w-full">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={task.completed}
          onChange={() => completeTask()}
        />
        {isEditing ? (
          <input
            type="text"
            defaultValue={task.title}
            className="input input-bordered input-sm w-full"
            onBlur={(e) => handleEdit(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleEdit(e.currentTarget.value)
            }
            autoFocus
          />
        ) : (
          <span
            className={`text-lg ${
              task.completed ? "line-through text-gray-400" : "text-gray-700"
            } cursor-pointer hover:text-gray-900`}
            onClick={() => setEditingTask(task._id)}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex gap-2">
      <button
            onClick={() => toggleImportantTask()}
            className="btn btn-sm tooltip"
            data-tip="Important"
          >
            {!task.isStarred ? <FaRegStar /> : <FaStar/>}
          </button>
        {isEditing ? (
          <button
            onClick={() => setEditingTask(null)}
            className="btn btn-sm tooltip"
            data-tip="Save"
          >
            <FaSave />
          </button>
        ) : (
          <button
            onClick={() => setEditingTask(task._id)}
            className="btn btn-sm tooltip"
            data-tip="Edit"
          >
            <FaEdit />
          </button>
        )}
        <button
          onClick={() => removeTask(task._id)}
          className="btn btn-sm tooltip"
          data-tip="Delete"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
