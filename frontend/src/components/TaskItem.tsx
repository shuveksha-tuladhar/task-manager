import { useTaskStore } from "../stores/useTaskStores";
import { patchApi } from "../util/api";
import useGlobalStore from "../stores/useGlobalStore";
import { TaskType } from "./types/TaskType";
import { TaskProps } from "./types/TaskProps";
import CheckableLabelItem from "./CheckableLabelItem";

const TaskItem = ({ task }: TaskProps) => {
  const { addToast } = useGlobalStore();
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
        <CheckableLabelItem
          label={task.title}
          checked={task.completed}
          onComplete={completeTask}
          onLabelClick={() => setActiveTaskId(task._id)}
          isStarred={task.isStarred}
          onToggleStarred={toggleImportantTask}
          metadata={{
            isInMyDay: task.isMyDay ?? false,
            completedSubtasks: task.steps?.filter(step => step.completed).length,
            totalSubtasks: task.steps?.length,
            // attachedFileCount: 0,
          }}
        />
      </li>
    </>
  );
};

export default TaskItem;
