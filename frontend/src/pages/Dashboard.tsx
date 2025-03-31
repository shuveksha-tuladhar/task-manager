import AddTask from "../components/AddTask";
import Sidebar from "../components/Sidebar";
import TaskList from "../components/TaskList";
import { useTaskStore } from "../stores/useTaskStores";

const Dashboard: React.FC = () => {
  const activeCategory = useTaskStore((state) => state.activeCategory);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">{activeCategory}</h1>
        <AddTask />
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
