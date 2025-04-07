import { useListStore } from "../stores/useListStores";
import TaskItem from "./TaskItem";
import { useTaskStore } from "../stores/useTaskStores";

const TaskList: React.FC = () => {
  const { activeList } = useListStore();
  const { tasks } = useTaskStore();

  const filteredTasks = tasks.filter((task) => task.listId === activeList?._id);

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">{activeList?.name}</h3>
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks in this category.</p>
      ) : (
        <ul className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
