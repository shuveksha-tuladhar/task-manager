import { ListType } from "../components/types/ListType";
import { ListEnum } from "../components/types/ListEnum";

const toUnderscoreId = (name: string) =>
  name.trim().toLowerCase().replace(/\s+/g, "_");

export const getStaticLists = (): ListType[] => {
  return Object.values(ListEnum).map((name) => {
    return {
      _id: toUnderscoreId(name),
      name,
      userId: null,
      canDelete: false,
      createdAt: null,
      isStatic: true,
    };
  });
};

export default getStaticLists;
