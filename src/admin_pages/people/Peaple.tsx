import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import AdminAside from "../../shared/admin_aside/AdminAside";
import AdminHeader from "../../shared/admin_header/AdminHeader";

const Peaple = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    country: "RU",
    order: "new",
    interactions: ["cart", "favorites"],
  });

  const toggleFilter = (category, value) => {
    setFilters((prev) => {
      if (Array.isArray(prev[category])) {
        return {
          ...prev,
          [category]: prev[category].includes(value)
            ? prev[category].filter((v) => v !== value)
            : [...prev[category], value],
        };
      }
      return { ...prev, [category]: prev[category] === value ? "" : value };
    });
  };

  const data = new Array(7).fill({
    name: "Ronald Richards",
    email: "felicia.reid@example.co",
    location: "Россия, Москва",
    phone: "077 4952 5383",
    social: "@opulentice",
    startDate: "1 Feb, 2020",
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex w-full">
        <AdminAside />
        <div>
          <div className="w-full bg-white shadow-md rounded-2xl ml-4 mt-4">
            <div className="flex justify-between items-center">
              <p className="mt-6 ml-8">Данные</p>
              <Button className="mt-6 mr-8">Export to Excel</Button>
            </div>
            <div className="mt-4 bg-blue-600 p-2">
              <ul className="flex gap-14">
                <li className="text-white text-xs font-bold ml-6">
                  Всего пользователей
                </li>
                <li className="text-white text-xs font-bold">Админы</li>
                <li className="text-white text-xs font-bold">Неактивные</li>
              </ul>
            </div>
            <div className="pb-4">
              <ul className="flex gap-28 mt-4">
                <li className=" text-xs ml-[76px]">233</li>
                <li className=" text-xs ml-[25px]">11</li>
                <li className=" text-xs">11</li>
              </ul>
            </div>
          </div>
          <div className="p-6 w-full bg-white shadow-md p-6 rounded-2xl ml-4 mt-4">
            <div className="mb-4 flex items-center justify-center gap-14">
              <h2 className="text-xl font-medium mb-4">Найдено: 110</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Поиск"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="p-2 border rounded w-full"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-3 text-left">ФИО</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Страна и город</th>
                    <th className="p-3 text-left">Номер телефона</th>
                    <th className="p-3 text-left">Соц сети</th>
                    <th className="p-3 text-left">Дата старта</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((person, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="p-3 border">{person.name}</td>
                      <td className="p-3 border">{person.email}</td>
                      <td className="p-3 border">{person.location}</td>
                      <td className="p-3 border">{person.phone}</td>
                      <td className="p-3 border">{person.social}</td>
                      <td className="p-3 border">{person.startDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md p-6 max-w-[248px] rounded-2xl ml-4">
        <h2 className="text-xl font-bold mb-4">Фильтр</h2>
        <div className="mb-4">
          <h3 className="font-medium">Страна</h3>
          {["RU", "KZ", "Other"].map((value, idx) => (
            <div key={idx} className="flex items-center my-2">
              <input
                type="checkbox"
                checked={filters.country === value}
                onChange={() => toggleFilter("country", value)}
                className="mr-2"
              />
              {value}
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="font-medium">Сначала</h3>
          {["new", "old", "inactive"].map((value, idx) => (
            <div key={idx} className="flex items-center my-2">
              <input
                type="checkbox"
                checked={filters.order === value}
                onChange={() => toggleFilter("order", value)}
                className="mr-2"
              />
              {value}
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="font-medium">Взаимодействие</h3>
          {["cart", "favorites"].map((value, idx) => (
            <div key={idx} className="flex items-center my-2">
              <input
                type="checkbox"
                checked={filters.interactions.includes(value)}
                onChange={() => toggleFilter("interactions", value)}
                className="mr-2"
              />
              {value}
            </div>
          ))}
        </div>
        <button
          onClick={() =>
            setFilters({ country: "", order: "", interactions: [] })
          }
          className="w-full py-2 mt-4 border rounded-lg"
        >
          Очистить
        </button>
      </div>
    </div>
  );
};

export default Peaple;
