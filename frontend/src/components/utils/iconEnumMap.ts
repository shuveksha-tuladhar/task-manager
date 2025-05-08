import { IconType } from "react-icons";
import { FaSun, FaStar } from "react-icons/fa";
import { ListEnum } from "../types/ListEnum";
import { TaskType } from "../types/TaskType";

type ListMeta = {
  icon: IconType;
  fieldName?: keyof TaskType;
};

export const iconEnumMap: Record<ListEnum, ListMeta> = {
  [ListEnum.MyDay]: {
    icon: FaSun,
    fieldName: "isMyDay",
  },
  [ListEnum.Important]: {
    icon: FaStar,
    fieldName: "isStarred",
  },
};
