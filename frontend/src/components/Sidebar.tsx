import { FaSun, FaStar, FaCalendarAlt, FaTasks } from "react-icons/fa";
import { useTaskStore } from "../stores/useTaskStores";

const categories = [
  { name: "My Day", icon: <FaSun /> },
  { name: "Important", icon: <FaStar /> },
  { name: "Planned", icon: <FaCalendarAlt /> },
  { name: "Tasks", icon: <FaTasks /> },
];

const Sidebar: React.FC = () => {
  const { activeCategory, setActiveCategory } = useTaskStore();

  return (
    <div className="w-64 h-screen bg-base-200 p-5 shadow-md">
      <h2 className="text-xl font-bold mb-5">My Tasks</h2>
      <ul className="space-y-2">
        {categories.map(({ name, icon }) => (
          <li key={name}>
            <button
              className={`flex items-center gap-3 p-3 w-full rounded-md transition ${
                activeCategory === name ? "bg-primary text-white" : "hover:bg-base-300"
              }`}
              onClick={() => setActiveCategory(name)}
            >
              {icon}
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
