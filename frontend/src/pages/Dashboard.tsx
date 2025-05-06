import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TaskList from "../components/TaskList";
import { useTaskStore } from "../stores/useTaskStore";
import { getApi } from "../util/api";
import { TaskType } from "../components/types/TaskType";
import AddTask from "../components/AddTask";

const Dashboard: React.FC = () => {
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
    <div className="flex grow-1 bg-gray-50  overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-scroll bg-indigo-400">
        <TaskList />
        <AddTask />
      </div>
    </div>
  );
};

export default Dashboard;
