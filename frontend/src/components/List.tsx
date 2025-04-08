import { FaTrash } from "react-icons/fa";
import { useListStore } from "../stores/useListStores";
import { ListProps } from "./types/ListProps";
import { deleteApi } from "../util/api";
import useGlobalStore from "../stores/useGlobalStore";

const List = ({ list: listToDelete }: ListProps) => {
  const { list, activeList, setActiveList, removeList } = useListStore();
  const { addToast } = useGlobalStore();

  const deleteList = (id: string) => {
    deleteApi("/api/lists/" + id)
      .then((resp) => {
        console.log(resp);
        if (resp.data) {
          removeList(id);
          if (activeList?._id === id) {
            setActiveList(list[0]);
          }
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
        throw error;
      });
  };
  return (
    <li key={listToDelete._id} className="group">
      <button
        className={`flex items-center gap-3 p-3 w-full rounded-md transition ${
          activeList?._id === listToDelete._id
            ? "bg-primary text-white"
            : "hover:bg-base-300"
        }`}
        onClick={() => setActiveList(listToDelete)}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            {listToDelete.icon}
            <span className="ml-3">{listToDelete.name}</span>
          </div>
          {listToDelete.canDelete && (
            <button
              onClick={() => deleteList(listToDelete._id)}
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
