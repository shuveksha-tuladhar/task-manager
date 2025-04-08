import { create } from "zustand";
import { ToastItem } from "../components/Toast/types/ToastItem";
import { ModalProps } from "../components/types/ModalProps";

interface GlobalState {
  toast: ToastItem | null;
  addToast: (toast: ToastItem) => void;
  removeToast: () => void;

  modalData: ModalProps | null;
  isOpen: boolean;
  openModal: (modal: ModalProps) => void;
  closeModal: () => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  toast: null,
  modalData: null,
  isOpen: false,

  addToast: (toast) => {
    const id = Date.now().toString();
    set({ toast: { ...toast, id } });
  },
  removeToast: () => set({ toast: null }),
  openModal: (data) => set({ isOpen: true, modalData: data }),
  closeModal: () => set({ isOpen: false, modalData: null }),
}));

export default useGlobalStore;
