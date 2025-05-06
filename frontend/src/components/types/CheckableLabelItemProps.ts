export interface CheckableLabelItemProps {
  label: string;
  checked: boolean;
  onComplete: () => void;
  onLabelClick?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
  className?: string;
  // Make starred
  isStarred?: boolean;
  onToggleStarred?: () => void;
  disableStarred?: boolean;
  // Make dynamic edit
  isEditing?: boolean;
  onLabelChange?: (newLabel: string) => void;
  metadata?: {
    isInMyDay?: boolean;
    completedSubtasks?: number;
    totalSubtasks?: number;
    attachedFileCount?: number;
    hasNote?: boolean;
  };
}
