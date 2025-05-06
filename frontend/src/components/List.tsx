import { FaTrash } from "react-icons/fa";
import { useListStore } from "../stores/useListStore";
import { ListProps } from "./types/ListProps";
import { deleteApi } from "../util/api";
import useGlobalStore from "../stores/useGlobalStore";
import { useTaskStore } from "../stores/useTaskStore";

const List = ({ list }: ListProps) => {
  const { lists, activeList, setActiveList, removeList } = useListStore();
  const { setActiveTaskId } = useTaskStore();
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
                setActiveList(lists[0]);
                setActiveTaskId(null);
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
    <>
      <li key={list._id} className="relative group">
        {activeList?._id === list._id && (
          <div className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 bg-indigo-500 rounded-2xl" />
        )}

        <div
          role="button"
          tabIndex={0}
          className={`flex items-center gap-3 pl-3 pr-2 py-2 w-full rounded-md transition cursor-pointer text-gray-600 ${
            activeList?._id === list._id
              ? "bg-gray-200/75"
              : "hover:bg-base-200"
          }`}
          onClick={() => {
            setActiveList(list);
            setActiveTaskId(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveList(list);
              setActiveTaskId(null);
            }
          }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              {list.icon}
              <span>{list.name}</span>
            </div>
            {list.canDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteList(list._id);
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
    </>
  );
};

export default List;
