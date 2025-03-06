import React from "react";
import AdminAside from "../../shared/admin_aside/AdminAside";
import AdminHeader from "../../shared/admin_header/AdminHeader";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Separator } from "../../components/ui/separator";

const data = [
  { year: "2016", Россия: 200, Казахстан: 100, Другие: 50 },
  { year: "2017", Россия: 250, Казахстан: 120, Другие: 80 },
  { year: "2018", Россия: 220, Казахстан: 150, Другие: 150 },
  { year: "2019", Россия: 280, Казахстан: 200, Другие: 227 },
];

// Для круговой диаграммы
const pieData = [
  { name: "Россия", value: 500 },
  { name: "Казахстан", value: 350 },
  { name: "Другие", value: 150 },
];

const Dashboard = () => {
  return (
    <div className="mb-40">
      <AdminHeader />
      <div className="flex">
        <AdminAside />

        {/* Основной контент */}
        <div className="flex">
          <div className="w-96 bg-white shadow-md pl-6 pr-4 py-6 mt-4 ml-4 rounded-2xl">
            <h2 className="text-xl font-bold">Посетили сайт</h2>
            <p className="text-gray-500 font-normal">Сегодня</p>

            {/* Диаграмма */}
            <div className="h-48 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="Россия"
                    stackId="1"
                    stroke="#008080"
                    fill="#008080"
                  />
                  <Area
                    type="monotone"
                    dataKey="Казахстан"
                    stackId="1"
                    stroke="#8A2BE2"
                    fill="#8A2BE2"
                  />
                  <Area
                    type="monotone"
                    dataKey="Другие"
                    stackId="1"
                    stroke="#FFA500"
                    fill="#FFA500"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Круговая диаграмма */}
          <div className="w-96 bg-white shadow-md pl-6 pr-4 py-6 mt-4 ml-4 rounded-2xl">
            <h2 className="text-xl font-bold">Посетили сайт</h2>
            <p className="text-gray-500 font-normal">Сегодня</p>

            {/* Круговая диаграмма */}
            <div className="h-48 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    label
                  >
                    <Cell fill="#008080" />
                    <Cell fill="#8A2BE2" />
                    <Cell fill="#FFA500" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Третий блок с "Посетили сайт" перемещен вниз */}
      <div className="w-96 bg-white shadow-md pl-6 pr-4 py-6 mt-4 ml-4 rounded-2xl ml-72">
        <h2 className="text-xl font-bold">Активны сейчас</h2>
        <p className="text-gray-500 font-normal text-center mt-11">Admin</p>
        <p className="text-black text-center text-6xl font-medium mb-10 mt-3">
          3
        </p>
        <Separator className="h-1 w-1000px bg-[#2F80ED]" />
        <p className="text-gray-500 font-normal text-center mt-10">
          Пользователей
        </p>
        <p className="text-black text-center text-6xl font-medium mb-10 mt-3">
          135
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
