import { FaTasks } from "react-icons/fa";

import { ListType } from "./types/ListType";
import { useEffect } from "react";
import List from "./List";
import { getApi } from "../util/api";
import { useListStore } from "../stores/useListStores";
import { iconEnumMap, IconMap } from "./utils/iconEnum";

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
    <div className="w-64 h-screen bg-base-200 p-5 shadow-md">
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
      <ul className="space-y-2 ">
        {lists
          .filter((list) => list.canDelete)
          .map((list) => {
            const listWithIcon = { ...list, icon: <FaTasks /> };
            return <List list={listWithIcon} key={listWithIcon._id} />;
          })}
      </ul>
    </div>
  );
};

export default Sidebar;
