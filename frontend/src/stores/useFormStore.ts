import { create } from "zustand";
import { FormData } from "./types/FormDataType";
interface FormState {
  formData: FormData;
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  updateFormData: (key: keyof FormData, value: string) => void;
  setLoading: (loading: boolean) => void;
  setErrorMessage: (message: string | null) => void;
  clearErrorMessage: () => void;
  setSuccessMessage: (message: string | null) => void;
  clearSuccessMessage: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  formData: {
    name: undefined,
    email: undefined,
    password: undefined,
  },
  loading: false,
  errorMessage: null,
  successMessage: null,
  updateFormData: (key, value) =>
    set((state) => ({
      formData: { ...state.formData, [key]: value },
    })),
  setLoading: (loading) => set({ loading }),
  setErrorMessage: (message) => set({ errorMessage: message }),
  clearErrorMessage: () => set({ errorMessage: null }),
  setSuccessMessage: (message) => set({ successMessage: message }),
  clearSuccessMessage: () => set({ successMessage: null }),
}));
