import React from "react";
import AdminAside from "../../shared/admin_aside/AdminAside";
import AdminHeader from "../../shared/admin_header/AdminHeader";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs"; // Предположим, что у вас есть компонент Tabs

const Ordest = () => {
  const orders = [
    {
      basketNumber: "№512",
      date: "22 Oct, 2020",
      user: "Jane Cooper",
      items: 826,
      country: "Åland Islands",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
    },
    {
      basketNumber: "№512",
      date: "24 May, 2020",
      user: "Jacob Jones",
      items: 740,
      country: "Greece",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
    },
    {
      basketNumber: "№512",
      date: "8 Sep, 2020",
      user: "Theresa Webb",
      items: 447,
      country: "Israel",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
    },
    {
      basketNumber: "№512",
      date: "22 Oct, 2020",
      user: "Cameron Williams",
      items: 798,
      country: "Afghanistan",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
    },
    {
      basketNumber: "№512",
      date: "21 Sep, 2020",
      user: "Savannah Nguyen",
      items: 556,
      country: "Georgia",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
    },
    {
      basketNumber: "№512",
      date: "24 May, 2020",
      user: "Darrell Steward",
      items: 816,
      country: "South Africa",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
    },
    {
      basketNumber: "№512",
      date: "17 Oct, 2020",
      user: "Annette Black",
      items: 196,
      country: "Sao Tome and Prin",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
    },
    {
      basketNumber: "№512",
      date: "17 Oct, 2020",
      user: "Bessie Cooper",
      items: 177,
      country: "Brazil",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
    },
    {
      basketNumber: "№512",
      date: "1 Feb, 2020",
      user: "Guy Hawkins",
      items: 185,
      country: "Saint Barthélemy",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
    },
    {
      basketNumber: "№512",
      date: "1 Feb, 2020",
      user: "Brooklyn Simmons",
      items: 922,
      country: "Pakistan",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
    },
    {
      basketNumber: "№512",
      date: "1 Feb, 2020",
      user: "Courtney Henry",
      items: 994,
      country: "Central African Rei",
      status: "не обработан",
      сommission: "0%",
      order_amount: "0.00",
      translation: "Подтвержден",
    },
  ];

  return (
    <div className="">
      <AdminHeader />
      <div className="flex p-6">
        <AdminAside />

        <div className="">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="news">Новые</TabsTrigger>
              <TabsTrigger value="Service">Обслуживание</TabsTrigger>
              <TabsTrigger value="Processed">Обработанные</TabsTrigger>
            </TabsList>
            <TabsContent
              className="bg-white shadow-md pl-6 pr-4 py-6 mt-4 ml-4 rounded-2xl"
              value="news"
            >
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-[#2F80ED] text-white">
                    <th className="py-3 px-4 border-b text-left">
                      Номер корзины
                    </th>
                    <th className="py-3 px-4 border-b text-left">Дата</th>
                    <th className="py-3 px-4 border-b text-left">
                      Пользователь
                    </th>
                    <th className="py-3 px-4 border-b text-left">Позиции</th>
                    <th className="py-3 px-4 border-b text-left">Страна</th>
                    <th className="py-3 px-4 border-b text-left">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">
                        {order.basketNumber}
                      </td>
                      <td className="py-3 px-4 border-b">{order.date}</td>
                      <td className="py-3 px-4 border-b">{order.user}</td>
                      <td className="py-3 px-4 border-b">{order.items}</td>
                      <td className="py-3 px-4 border-b">{order.country}</td>
                      <td className="py-3 px-4 border-b">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>
            <TabsContent
              className="bg-white shadow-md pl-6 pr-4 py-6 mt-4 ml-4 rounded-2xl"
              value="Processed"
            >
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-[#2F80ED] text-white">
                    <th className="py-3 px-4 border-b text-left">
                      Номер корзины
                    </th>
                    <th className="py-3 px-4 border-b text-left">Дата</th>
                    <th className="py-3 px-4 border-b text-left">
                      Пользователь
                    </th>
                    <th className="py-3 px-4 border-b text-left">Комиссия</th>
                    <th className="py-3 px-4 border-b text-left">
                      Сумма заказа
                    </th>
                    <th className="py-3 px-4 border-b text-left">Перевод ДС</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">
                        {order.basketNumber}
                      </td>
                      <td className="py-3 px-4 border-b">{order.date}</td>
                      <td className="py-3 px-4 border-b">{order.user}</td>
                      <td className="py-3 px-4 border-b">{order.сommission}</td>
                      <td className="py-3 px-4 border-b">
                        {order.order_amount}
                      </td>
                      <td className="py-3 px-4 border-b">
                        {order.translation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="Service">q2323we</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Ordest;
