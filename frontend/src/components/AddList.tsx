import { FaPlus } from "react-icons/fa";
import { useListStore } from "../stores/useListStores";
import { ListType } from "./types/ListType";
import { postApi } from "../util/api";
import useToastStore from "./Toast/types/useToastStore";

const AddList: React.FC = () => {
  const { listInput, setListInput, list, setList, setActiveList } = useListStore();
  const { addToast } = useToastStore();

  const addList = () => {
    postApi<ListType>("/api/lists", {
      name: listInput,
      userId: "67e70326de9957df819ceb17", // TODO: use the logged user ID
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
    <div className="flex gap-2 my-4">
      <input
        type="text"
        placeholder="Add a list..."
        className="input input-bordered flex-1"
        value={listInput}
        onChange={(e) => setListInput(e.target.value)}
      />
      <button
        className="btn btn-primary"
        onClick={() => addList()}
        disabled={!listInput.trim()}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default AddList;
