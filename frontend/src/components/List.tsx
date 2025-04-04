import { FaTrash } from "react-icons/fa";
import { useListStore } from "../stores/useListStores";
import { ListProps } from "./types/ListProps";
import { deleteApi } from "../util/api";
import useToastStore from "./Toast/types/useToastStore";

const List = ({ list }: ListProps) => {
  const { activeList, setActiveList, removeList } = useListStore();
  const { addToast } = useToastStore();

  const deleteList = (id: string) => {
    deleteApi("/api/lists/" + id)
      .then((resp) => {
        console.log(resp);
        if (resp.data) {
          removeList(id);
          // If active list is current list to be deleted
          // setActiveList();
        } else {
          console.error(resp.error);
          addToast({
            message: resp?.error?.message ?? "Error deleting List",
            type: "error",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        addToast({ message: "Error deleting List", type: "error" });
      });
  };
  return (
    <li key={list._id} className="group">
      <button
        className={`flex items-center gap-3 p-3 w-full rounded-md transition ${
          activeList?._id === list._id
            ? "bg-primary text-white"
            : "hover:bg-base-300"
        }`}
        onClick={() => setActiveList(list)}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            {list.icon}
            <span className="ml-3">{list.name}</span>
          </div>
          {list.canDelete && (
            <button
              onClick={() => deleteList(list._id)}
              className="btn btn-sm tooltip invisible group-hover:visible transition-all"
              data-tip="Delete"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </button>
    </li>
  );
};

export default List;
