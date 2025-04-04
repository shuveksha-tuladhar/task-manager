import { ToastType } from "./ToastType";

export interface ToastItem {
  id?: string;
  type: ToastType;
  message: string;
}
