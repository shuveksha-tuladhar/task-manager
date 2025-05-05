import { FaCheck, FaPaperclip, FaRegStar, FaStar, FaSun } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { CheckableLabelItemProps } from "./types/CheckableLabelItemProps";

const CheckableLabelItem = ({
  label,
  checked,
  onComplete,
  onLabelClick,
  onDelete,
  disabled = false,
  className = "",
  isStarred = false,
  onToggleStarred: onToggleImportant,
  metadata,
  isEditing = false,
  onLabelChange,
}: CheckableLabelItemProps) => {
  return (
    <div
      className={`group flex items-center justify-between w-full ${className}`}
    >
      <div className="flex items-center gap-3 flex-grow">
        <label className="relative inline-flex items-center justify-center w-5 h-5">
          <input
            type="checkbox"
            checked={checked}
            onChange={onComplete}
            className="peer w-5 h-5 rounded-full border-2 border-gray-500 bg-white checked:bg-indigo-500 checked:border-indigo-500 appearance-none cursor-pointer"
            disabled={disabled}
          />
          <FaCheck className="absolute text-white text-xs opacity-0 peer-checked:opacity-100 pointer-events-none" />
        </label>

        <div className="flex-grow">
          {isEditing ? (
            <input
              type="text"
              defaultValue={label}
              onBlur={(e) => onLabelChange?.(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onLabelChange?.(e.currentTarget.value)}
              className="w-full"
              autoFocus
            />
          ) : (
            <span
              className={`text-base flex-grow truncate text-sm ${
                checked ? "line-through text-gray-400" : "text-gray-800"
              } cursor-pointer hover:text-black`}
              onClick={onLabelClick}
            >
              {label}
            </span>
          )}

          {metadata && (
            <div className="text-xs text-gray-500 mt-1 flex gap-2 items-center flex-wrap">
              {metadata.isInMyDay && (
                <span className="flex items-center gap-1">
                  <FaSun /> <span>My Day</span>
                </span>
              )}
              {metadata.completedSubtasks !== undefined &&
                metadata.totalSubtasks !== undefined && (
                  <span className="flex items-center gap-1">
                    <FaCheck />
                    {` ${metadata.completedSubtasks} of ${metadata.totalSubtasks}`}
                  </span>
                )}
              {metadata.attachedFileCount !== undefined && (
                <span className="flex items-center gap-1">
                  <FaPaperclip />
                  <span>
                    {metadata.attachedFileCount > 0
                      ? `${metadata.attachedFileCount} File${
                          metadata.attachedFileCount > 1 ? "s" : ""
                        } attached`
                      : "0 Files attached"}
                  </span>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onToggleImportant && (
          <button
            onClick={onToggleImportant}
            className="btn btn-ghost"
            title="Mark Important"
          >
            {isStarred ? (
              <FaStar className="text-gray-500" />
            ) : (
              <FaRegStar className="text-gray-500" />
            )}
          </button>
        )}

        {onDelete && (
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Delete"
          >
            <FaXmark />
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckableLabelItem;
