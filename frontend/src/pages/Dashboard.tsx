import AddTask from "../components/AddTask";
import Sidebar from "../components/Sidebar";
import TaskList from "../components/TaskList";
import { useListStore } from "../stores/useListStores";

const Dashboard: React.FC = () => {
  const activeList = useListStore((state) => state.activeList);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">{activeList?.name ?? 'My Day'}</h1>
        <AddTask />
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
