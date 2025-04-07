import { useListStore } from "../stores/useListStores";
import TaskItem from "./TaskItem";
import { useTaskStore } from "../stores/useTaskStores";

const TaskList: React.FC = () => {
  const { activeList } = useListStore();
  const { tasks } = useTaskStore();

  const filteredTasks = tasks.filter((task) => task.listId === activeList?._id);

  const taskNotCompleted = filteredTasks
    .filter((task) => !task.completed)
    .map((task) => <TaskItem key={task._id} task={task} />);

  const taskCompleted = filteredTasks
    .filter((task) => task.completed)
    .map((task) => <TaskItem key={task._id} task={task} />);

  return (
    <div className="p-4">
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks in this category.</p>
      ) : (
        <ul className="space-y-3">
          {taskNotCompleted}
          {taskCompleted.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4">Completed</h3>

              {taskCompleted}
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
