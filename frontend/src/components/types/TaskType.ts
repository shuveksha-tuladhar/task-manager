import { PriorityEnum } from "./PriorityEnum";

export interface Step {
  title: string;
  completed: boolean;
}
export interface TaskType {
  _id: string;
  title: string;
  listId: string;
  completed: boolean;
  isStarred?: boolean;
  steps?: Step[];
  priority?: PriorityEnum;
}
