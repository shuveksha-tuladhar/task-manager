import { PriorityEnum } from "./PriorityEnum";

export interface Step {
  _id?: string;
  title: string;
  completed: boolean;
}
export interface TaskType {
  _id: string;
  title: string;
  listId: string;
  completed: boolean;
  isStarred?: boolean;
  isMyDay?: boolean;
  steps?: Step[];
  priority?: PriorityEnum;
}
