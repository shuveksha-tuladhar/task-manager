import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TaskList from "../components/TaskList";
import { useListStore } from "../stores/useListStores";
import { useTaskStore } from "../stores/useTaskStores";
import { getApi } from "../util/api";
import { TaskType } from "../components/types/TaskType";

const Dashboard: React.FC = () => {
  const activeList = useListStore((state) => state.activeList);
  const { setTasks } = useTaskStore();

  useEffect(() => {
    getApi<TaskType[]>("/api/tasks")
      .then((resp) => {
        if (resp.data) {
          setTasks(resp.data);
        }
      })
      .catch((err) => console.error(err));
  }, [setTasks]);

  return (
    <div className="flex grow-1 bg-gray-50 pb-2 overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-scroll">
        <h1 className="text-2xl font-bold">{activeList?.name ?? "My Day"}</h1>
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
