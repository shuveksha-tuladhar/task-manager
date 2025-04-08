import { IconType } from "react-icons";
import { FaSun, FaStar, FaCalendarAlt } from "react-icons/fa";
import { ListEnum } from "../types/ListEnum";

export const iconEnumMap: Record<ListEnum, IconType> = {
  [ListEnum.MyDay]: FaSun,
  [ListEnum.Important]: FaStar,
  [ListEnum.Planned]: FaCalendarAlt,
};
