import { useEffect } from "react";
import { FaSearch, FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { ListType } from "./types/ListType";
import List from "./List";
import { getApi } from "../util/api";
import { useListStore } from "../stores/useListStore";
import { iconEnumMap } from "./utils/iconEnumMap";
import AddList from "./AddList";
import { ListEnum } from "./types/ListEnum";
import { useTaskStore } from "../stores/useTaskStore";
import { User } from "./types/UserType";
import { useUserStore } from "../stores/useUserStore";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, clearUser } = useUserStore();
  const {
    lists,
    setLists: setList,
    setActiveList,
    staticLists,
  } = useListStore();
  const { setActiveTaskId } = useTaskStore();

  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/);
    return words.length >= 2
      ? words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase()
      : words[0][0].toUpperCase();
  };

  useEffect(() => {
    getApi<User>("/api/users/profile").then((resp) => {
      if (resp.data) {
        console.log(resp.data);
        setUser(resp.data);
      } else {
        console.error("Error fetching user data");
      }
    });
  }, [setUser]);

  useEffect(() => {
    getApi<ListType[]>("/api/lists")
      .then((resp) => {
        if (resp.data) {
          setList(resp.data);
          setActiveList(staticLists[0]);
          setActiveTaskId(null);
        }
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }, [setList, setActiveList, setActiveTaskId, staticLists]);

  return (
    <div className="flex flex-col w-64 bg-gray-50 border-t-[1px] border-t-black/10">
      <div className="space-y-2 mt-4 flex-grow">
        <div className="max-w-sm p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="dropdown dropdown-bottom dropdown-start">
              <div
                tabIndex={0}
                role="button"
                className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-medium cursor-pointer"
              >
                {user?.name && getInitials(user?.name)}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
              >
                <li>
                  <a
                    onClick={() => {
                      localStorage.removeItem("token");
                      clearUser();
                      navigate("/");
                    }}
                  >
                    Log out
                  </a>
                </li>
              </ul>
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-800">
                {user?.name}
              </p>
              <p className="text-xs text-gray-800">{user?.email}</p>
            </div>
          </div>

          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-4 pr-10 py-2 text-sm rounded-md border border-gray-100  bg-gray-50 shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs" />
          </div>
        </div>

        <aside className="w-64 bg-gray-50 text-sm flex flex-col">
          <ul className="space-y-2">
            {staticLists
              .map((list) => {
                const IconComponent =
                  iconEnumMap[list.name as ListEnum]?.icon || FaTasks;
                return {
                  ...list,
                  icon: <IconComponent />,
                };
              })
              .map((list) => (
                <List list={list} key={list._id} />
              ))}
          </ul>
          <ul className="space-y-2 py-2 mt-4 border-t border-black/10 flex-grow">
            {lists
              .filter((list) => list.canDelete)
              .map((list) => {
                const listWithIcon = { ...list, icon: <FaTasks /> };
                return <List list={listWithIcon} key={listWithIcon._id} />;
              })}
          </ul>
        </aside>
      </div>
      <div className="mt-auto w-full">
        <AddList />
      </div>
    </div>
  );
};

export default Sidebar;
