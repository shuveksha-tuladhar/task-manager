import { TaskType } from "./TaskType";

export interface TaskPanelProps {
  task: TaskType | undefined;
  onClose: () => void;
  onDelete: (id: string) => void;
}