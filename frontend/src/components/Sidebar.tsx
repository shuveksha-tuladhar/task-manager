import { FaTasks } from "react-icons/fa";

import { ListType } from "./types/ListType";
import { useEffect } from "react";
import List from "./List";
import { getApi } from "../util/api";
import { useListStore } from "../stores/useListStores";
import { iconEnumMap, IconMap } from "./utils/iconEnum";
import AddList from "./AddList";

const Sidebar: React.FC = () => {
  const { list: lists, setList, setActiveList } = useListStore();
  useEffect(() => {
    getApi<ListType[]>("/api/lists")
      .then((resp) => {
        console.log(resp);
        if (resp.data) {
          setList(resp.data);
          setActiveList(resp.data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [setList, setActiveList]);

  return (
    <div className="flex flex-col w-64 bg-base-200 p-4">
      <div className="space-y-2 mt-4 flex-grow">
        <h2 className="text-xl font-bold mb-5">My Tasks</h2>
        <ul className="space-y-2">
          {lists
            .filter((list) => !list.canDelete)
            .map((list) => {
              const IconComponent = iconEnumMap[list.name as IconMap] || null;
              return {
                ...list,
                icon: IconComponent ? <IconComponent /> : <FaTasks />,
              };
            })
            .map((list) => (
              <List list={list} key={list._id} />
            ))}
        </ul>
        <hr />
        <ul className="space-y-2 mt-4 flex-grow">
          {lists
            .filter((list) => list.canDelete)
            .map((list) => {
              const listWithIcon = { ...list, icon: <FaTasks /> };
              return <List list={listWithIcon} key={listWithIcon._id} />;
            })}
        </ul>
      </div>
      <div className="mt-auto w-full">
        <AddList />
    </div>
    </div>
  );
};

export default Sidebar;
