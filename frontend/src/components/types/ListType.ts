import { ReactNode } from "react";

export interface ListType {
  _id: string;
  name: string;
  userId: string | null;
  canDelete: boolean;
  createdAt: string | null;
  // For UI only
  icon?: ReactNode;
  isStatic?: boolean;
}
