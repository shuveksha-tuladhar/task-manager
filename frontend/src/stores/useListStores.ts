import { create } from "zustand";
import { ListType } from "../components/types/ListType";
interface ListStore {
  list: ListType[];
  activeList: ListType | null;
  listInput: string;
  setList: (lists: ListType[]) => void;
  setActiveList: (activeList: ListType) => void;
  setListInput: (name: string) => void;
  removeList: (id: string) => void;
}

export const useListStore = create<ListStore>((set) => ({
  list: [],
  activeList: null,
  listInput: "",
  setList: (list) => set({ list }),
  setActiveList: (activeList) => set({ activeList }),
  setListInput: (name) => set({ listInput: name }),
  removeList: (id) =>
    set((state) => ({
      list: state.list.filter((list) => list._id !== id),
    })),
}));
