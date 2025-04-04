import { useListStore } from "../stores/useListStores";
import { ListProps } from "./types/ListProps";

const List = ({ list }: ListProps) => {
  const { activeList, setActiveList } = useListStore();
  return (
    <li key={list._id}>
      <button
        className={`flex items-center gap-3 p-3 w-full rounded-md transition ${
          activeList?._id === list._id
            ? "bg-primary text-white"
            : "hover:bg-base-300"
        }`}
        onClick={() => setActiveList(list)}
      >
        {list.icon}
        {list.name}
      </button>
    </li>
  );
};

export default List;
