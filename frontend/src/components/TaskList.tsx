import { useListStore } from "../stores/useListStores";
import TaskItem from "./TaskItem";
import { useTaskStore } from "../stores/useTaskStores";
import { TaskType } from "./types/TaskType";
import { ListEnum } from "./types/ListEnum";
import TaskPanel from "./TaskPanel";
import { useState } from "react";
import AddTask from "./AddTask";

const TaskList: React.FC = () => {
  const { activeList } = useListStore();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { tasks } = useTaskStore();

  const filteredTasks: TaskType[] =
    activeList?.name === ListEnum.Important
      ? tasks.filter(
          (task) => task.isStarred || task.listId === activeList?._id
        )
      : tasks.filter((task) => task.listId === activeList?._id);

  const taskNotCompleted = filteredTasks
    .filter((task) => !task.completed)
    .map((task) => <TaskItem key={task._id} task={task} />);

  const taskCompleted = filteredTasks
    .filter((task) => task.completed)
    .map((task) => <TaskItem key={task._id} task={task} />);

  return (
    <div className="p-4 flex flex-row">
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks in this category.</p>
      ) : (
        <ul className="space-y-3 flex-grow">
          {taskNotCompleted}
          {taskCompleted.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mt-4 mb-4">Completed</h3>
              <ul className="space-y-3">{taskCompleted}</ul>
            </div>
          )}
          <AddTask />
        </ul>
      )}
      {isOpen && (<TaskPanel task={tasks[0] ?? []} onClose={() => setIsOpen(false)} onDelete={() => console.log('Deleted')} />)}
    </div>
  );
};

export default TaskList;
