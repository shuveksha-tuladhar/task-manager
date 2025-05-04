import { useListStore } from "../stores/useListStores";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import TaskItem from "./TaskItem";
import { useTaskStore } from "../stores/useTaskStores";
import { TaskType } from "./types/TaskType";
import { ListEnum } from "./types/ListEnum";
import TaskPanel from "./TaskPanel";
import { useState } from "react";
import useGlobalStore from "../stores/useGlobalStore";
import { deleteApi } from "../util/api";

const TaskList: React.FC = () => {
  const { openModal, closeModal, addToast } = useGlobalStore();
  const { activeList } = useListStore();
  const [isCompletedOpen, setIsCompletedOpen] = useState<boolean>(true);
  const { tasks, activeTaskId, setActiveTaskId, removeTask } = useTaskStore();

  const filteredTasks: TaskType[] =
    activeList?.name === ListEnum.Important
      ? tasks.filter(
          (task) => task.isStarred || task.listId === activeList?._id
        )
      : tasks.filter((task) => task.listId === activeList?._id);

  const taskNotCompleted = filteredTasks
    .filter((task) => !task.completed)
    .map((task) => <TaskItem key={task._id} task={task} />);

  const completed = filteredTasks.filter((task) => task.completed);

  const taskCompleted = completed.map((task) => (
    <TaskItem key={task._id} task={task} />
  ));

  const handleDeleteTask = (id: string) => {
    openModal({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this task?",
      onConfirm: () => {
        deleteApi<TaskType>("/api/tasks/" + id)
          .then((resp) => {
            if (resp.data) {
              removeTask(id);
              addToast({
                message: "Task deleted successfully",
                type: "success",
              });
            } else {
              addToast({ message: "Error deleting task", type: "error" });
            }
          })
          .catch((error) => {
            console.error(error);
            addToast({ message: "Error deleting task", type: "error" });
          })
          .finally(() => closeModal());
      },
    });
  };

  return (
    <>
      <div className="flex flex-row h-full">
        <div className="w-full p-8">
          <h1 className="text-2xl font-semißbold text-white mb-4">
            {activeList?.name ?? "My Day"}
          </h1>
          {filteredTasks.length === 0 ? (
            <p className="text-gray-500">No tasks in this category.</p>
          ) : (
            <ul className="space-y-3 flex-grow">
              {taskNotCompleted}

              {completed.length > 0 && (
                <div>
                  <button
                    className="flex items-center gap-2 px-3 py-1 bg-indigo-100 rounded-md text-black text-sm font-medium hover:bg-indigo-200 transition cursor-pointer"
                    onClick={() => setIsCompletedOpen(!isCompletedOpen)}
                  >
                    {isCompletedOpen ? (
                      <FaChevronDown className="text-xs" />
                    ) : (
                      <FaChevronRight className="text-xs" />
                    )}
                    <p className="text-gray-700">
                      Completed <span className="ml-2">{completed.length}</span>{" "}
                    </p>
                  </button>
                  {isCompletedOpen && (
                    <ul className="space-y-1 mt-2">{taskCompleted}</ul>
                  )}
                </div>
              )}
            </ul>
          )}
        </div>

        {activeTaskId != null && (
          <TaskPanel
            task={tasks.find((task) => task._id === activeTaskId)}
            onClose={() => setActiveTaskId(null)}
            onDelete={(id) => handleDeleteTask(id)}
          />
        )}
      </div>
    </>
  );
};

export default TaskList;
