import { PriorityEnum } from "./PriorityEnum";

export interface TaskType {
  _id: string;
  title: string;
  listId: string;
  completed: boolean;
  isStarred?: boolean;
  priority?: PriorityEnum;
}
