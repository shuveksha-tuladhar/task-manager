import { useTaskStore } from "../stores/useTaskStores";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const { tasks, activeCategory } = useTaskStore();
  const filteredTasks = tasks.filter((task) => task.category === activeCategory);

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">{activeCategory}</h3>
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks in this category.</p>
      ) : (
        <ul className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
