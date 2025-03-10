import React from "react";
import Ava from "@/assets/images/ava.png";
import { Bell, Search, ChevronDown } from "lucide-react";

const AdminHeader = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-sm">
      {/* Левая часть с аватаром и именем */}
      <div className="flex items-center space-x-2">
        <img src={Ava} alt="Аватар" className="w-8 h-8 rounded-full" />
        <span className="text-sm font-medium">Альбина</span>
        <ChevronDown size={16} className="text-gray-500" />
      </div>

      {/* Центральная часть с поиском */}
      <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 text-gray-500 w-60">
        <Search size={16} />
        <input
          type="text"
          placeholder="Быстрый поиск"
          className="outline-none text-sm w-full ml-2 "
        />
      </div>

      {/* Правая часть с уведомлениями */}
      <div className="relative">
        <Bell size={20} className="text-blue-500 cursor-pointer" />
        <span className="absolute top-0 right-0 bg-red-500 w-2.5 h-2.5 rounded-full" />
      </div>
    </div>
  );
};

export default AdminHeader;
