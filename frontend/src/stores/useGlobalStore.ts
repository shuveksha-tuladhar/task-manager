import { create } from "zustand";
import { ToastItem } from "../components/Toast/types/ToastItem";

interface ToastState {
  toast: ToastItem | null;
  addToast: (toast: ToastItem) => void;
  removeToast: () => void;
}

const useGlobalStore = create<ToastState>((set) => ({
  toast: null,
  addToast: (toast) => {
    const id = Date.now().toString();
    set({ toast: { ...toast, id } });
  },
  removeToast: () => set({ toast: null }),
}));

export default useGlobalStore;
