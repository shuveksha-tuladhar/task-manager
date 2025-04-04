import { IconType } from "react-icons";
import { FaSun, FaStar, FaCalendarAlt } from "react-icons/fa";

export enum IconMap {
  MyDay = "My Day",
  Important = "Important",
  Planned = "Planned",
}

export const iconEnumMap: Record<IconMap, IconType> = {
  [IconMap.MyDay]: FaSun,
  [IconMap.Important]: FaStar,
  [IconMap.Planned]: FaCalendarAlt,
};
