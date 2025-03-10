import React from "react";
import {
  LayoutGrid,
  Users,
  ClipboardList,
  FileText,
  Monitor,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { title: "Сводная", icon: LayoutGrid, path: "/dashboard" },
  { title: "Пользователи", icon: Users, path: "/peaple" },
  { title: "Заявки", icon: ClipboardList, path: "/orderst" },
  { title: "Закупочный лист", icon: FileText, path: "/buy_list" },
  { title: "Соединения", icon: Monitor, path: "/bots" },
];

const AdminAside = () => {
  return (
    <aside className="w-64 bg-white shadow-md pl-6 pr-4 py-6 mt-4 ml-4 rounded-2xl min-w-[256px] h-[472px]">
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <item.icon
                  size={20}
                  className={({ isActive }) =>
                    `mr-3 ${isActive ? "text-blue-600" : "text-gray-500"}`
                  }
                />
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminAside;
