import { ReactNode } from "react";

export interface ListType {
  _id: string;
  name: string;
  userId: string;
  canDelete: boolean;
  createdAt: string;
  icon?: ReactNode;
}
