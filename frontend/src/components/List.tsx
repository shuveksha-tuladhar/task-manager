import { FaTrash } from "react-icons/fa";
import { useListStore } from "../stores/useListStores";
import { ListProps } from "./types/ListProps";
import { deleteApi } from "../util/api";
import useGlobalStore from "../stores/useGlobalStore";

const List = ({ list: listToDelete }: ListProps) => {
  const { list, activeList, setActiveList, removeList } = useListStore();
  const { addToast, openModal, closeModal } = useGlobalStore();

  const deleteList = (id: string) => {
    openModal({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this list?",
      onConfirm: () => {
        deleteApi("/api/lists/" + id)
          .then((resp) => {
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
          })
          .finally(() => closeModal());
      },
    });
  };

  return (
    <li key={listToDelete._id} className="group">
      <div
        role="button"
        tabIndex={0}
        className={`flex items-center gap-3 p-3 w-full rounded-md transition cursor-pointer ${
          activeList?._id === listToDelete._id
            ? "bg-primary text-white"
            : "hover:bg-base-300"
        }`}
        onClick={() => setActiveList(listToDelete)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setActiveList(listToDelete);
          }
        }}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            {listToDelete.icon}
            <span className="ml-3">{listToDelete.name}</span>
          </div>
          {listToDelete.canDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteList(listToDelete._id);
              }}
              className="btn btn-sm tooltip invisible group-hover:visible transition-all"
              data-tip="Delete"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default List;
