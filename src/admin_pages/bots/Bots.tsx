import React from "react";
import AdminAside from "../../shared/admin_aside/AdminAside";
import AdminHeader from "../../shared/admin_header/AdminHeader";
import { Pen, Trash } from "lucide-react";
const Bots = () => {
  const connections = [
    {
      status: "Обработка",
      date: "12.08.2019 - 22.08.2019",
      groups: 14,
      days: 10,
      state: "Обработка",
      account: "Альбина",
    },
    {
      status: "Рассылка",
      date: "21.12.2019 - 31.12.2019",
      groups: 7,
      days: 5,
      state: "Рассылка",
      account: "Марлен",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Обработка":
        return "bg-yellow-400"; // Жёлтый для статуса "Обработка"
      case "Рассылка":
        return "bg-green-500"; // Зеленый для статуса "Рассылка"
      default:
        return "bg-gray-500"; // Серый по умолчанию
    }
  };

  return (
    <div className="">
      <AdminHeader />
      <div className="flex p-6">
        <AdminAside />
        <div>
          
          <div>whatsapp</div>
          <div className="bg-white shadow-md pl-6 pr-4 py-6 mt-4 ml-4 rounded-2xl">
            <h1 className="text-2xl font-bold mb-4">Текущие соединения</h1>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 border-b text-left">Статус</th>
                  <th className="py-3 px-4 border-b text-left">Дата</th>
                  <th className="py-3 px-4 border-b text-left">Кол-во групп</th>
                  <th className="py-3 px-4 border-b text-left">
                    Работает дней
                  </th>
                  <th className="py-3 px-4 border-b text-left">Состояние</th>
                  <th className="py-3 px-4 border-b text-left">Аккаунт от</th>
                </tr>
              </thead>
              <tbody>
                {connections.map((connection, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">
                      <span
                        className={`inline-block w-4 h-4 rounded-full ${getStatusColor(
                          connection.status
                        )}`}
                      ></span>
                    </td>
                    <td className="py-3 px-4 border-b">{connection.date}</td>
                    <td className="py-3 px-4 border-b">{connection.groups}</td>
                    <td className="py-3 px-4 border-b">{connection.days}</td>
                    <td className="py-3 px-4 border-b">{connection.state}</td>
                    <td className="py-3 px-4 border-b">{connection.account}</td>
                    <td className="py-3 px-4 border-b">
                      {" "}
                      <Pen />
                    </td>
                    <td className="py-3 px-4 border-b">
                      {" "}
                      <Trash />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default Bots;
