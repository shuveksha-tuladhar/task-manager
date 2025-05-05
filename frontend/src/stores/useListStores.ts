import { create } from "zustand";
import { ListType } from "../components/types/ListType";
interface ListStore {
  lists: ListType[];
  activeList: ListType | null;
  listInput: string;
  setLists: (lists: ListType[]) => void;
  setActiveList: (activeList: ListType) => void;
  setListInput: (name: string) => void;
  removeList: (id: string) => void;
}

export const useListStore = create<ListStore>((set) => ({
  lists: [],
  activeList: null,
  listInput: "",
  setLists: (list) => set({ lists: list }),
  setActiveList: (activeList) => set({ activeList }),
  setListInput: (name) => set({ listInput: name }),
  removeList: (id) =>
    set((state) => ({
      lists: state.lists.filter((list) => list._id !== id),
    })),
}));
