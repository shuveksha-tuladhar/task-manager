import { FaPlus } from "react-icons/fa";
import { useListStore } from "../stores/useListStores";
import { ListType } from "./types/ListType";
import { postApi } from "../util/api";
import useGlobalStore from "../stores/useGlobalStore";
import { useTaskStore } from "../stores/useTaskStores";

const AddList: React.FC = () => {
  const {
    listInput,
    setListInput,
    lists: list,
    setLists: setList,
    setActiveList,
  } = useListStore();
  const { setActiveTaskId } = useTaskStore();
  const { addToast } = useGlobalStore();

  const handleAddList = () => {
    postApi<ListType>("/api/lists", {
      name: listInput,
    })
      .then((resp) => {
        if (resp.data) {
          const newList = resp.data;
          const filteredData: ListType = {
            _id: newList._id,
            name: newList.name,
            userId: newList.userId,
            canDelete: newList.canDelete,
            createdAt: newList.createdAt,
          };
          setList([...list, filteredData]);
          setListInput("");
          setActiveList(filteredData);
          setActiveTaskId(null);
          addToast({ message: "List added successfully", type: "success" });
        } else {
          console.error(resp.error);
          addToast({ message: resp.error.message, type: "error" });
        }
      })
      .catch((error) => {
        console.error(error);
        addToast({ message: "Error adding List", type: "error" });
      });
  };

  return (
    <div className="flex items-center gap-2 bg-white pl-3">
      <button
        className="flex items-center gap-1 text-blue-600 hover:underline focus:outline-none bg-white"
        onClick={handleAddList}
        disabled={!listInput.trim()}
      >
        <FaPlus className="text-xs text-gray-400" />
      </button>
      <input
        type="text"
        placeholder="New List"
        className="input border-none w-full focus:outline-none"
        value={listInput}
        onChange={(e) => setListInput(e.target.value)}
      />
    </div>
  );
};

export default AddList;
