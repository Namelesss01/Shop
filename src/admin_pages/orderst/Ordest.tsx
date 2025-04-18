import React, { useState } from "react";
import AdminAside from "../../shared/admin_aside/AdminAside";
import AdminHeader from "../../shared/admin_header/AdminHeader";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";

interface Order {
  id: string;
  basketNumber: string;
  date: string;
  user: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }[];
  country: string;
  status: string;
  сommission: string;
  order_amount: string;
  translation: string;
}

const orders: Order[] = [
  {
    id: "1",
    basketNumber: "№512",
    date: "22 Oct, 2020",
    user: "Jane Cooper",
    items: [
      { id: "item1", name: "Товар 1", quantity: 2, price: 100, imageUrl: "" },
    ],
    country: "Åland Islands",
    status: "На рассмотрении",
    сommission: "0%",
    order_amount: "0.00",
    translation: "Подтвержден",
  },
  {
    id: "2",
    basketNumber: "№513",
    date: "24 May, 2020",
    user: "Jacob Jones",
    items: [
      { id: "item2", name: "Товар 2", quantity: 3, price: 150, imageUrl: "" },
    ],
    country: "Greece",
    status: "Обработанные",
    сommission: "5%",
    order_amount: "450.00",
    translation: "Подтвержден",
  },
  {
    id: "3",
    basketNumber: "№514",
    date: "15 Jun, 2021",
    user: "John Doe",
    items: [
      { id: "item3", name: "Товар 3", quantity: 1, price: 200, imageUrl: "" },
    ],
    country: "Germany",
    status: "На рассмотрении",
    сommission: "0%",
    order_amount: "0.00",
    translation: "Подтвержден",
  },
  {
    id: "4",
    basketNumber: "№515",
    date: "30 Aug, 2021",
    user: "Alice Smith",
    items: [
      { id: "item4", name: "Товар 4", quantity: 4, price: 50, imageUrl: "" },
    ],
    country: "France",
    status: "Обработанные",
    сommission: "3%",
    order_amount: "200.00",
    translation: "Подтвержден",
  },
  {
    id: "5",
    basketNumber: "№516",
    date: "12 Dec, 2021",
    user: "Bob Johnson",
    items: [
      { id: "item5", name: "Товар 5", quantity: 2, price: 300, imageUrl: "" },
    ],
    country: "Italy",
    status: "На рассмотрении",
    сommission: "0%",
    order_amount: "0.00",
    translation: "Подтвержден",
  },
  {
    id: "6",
    basketNumber: "№517",
    date: "05 Jan, 2022",
    user: "Charlie Brown",
    items: [
      { id: "item6", name: "Товар 6", quantity: 5, price: 100, imageUrl: "" },
    ],
    country: "Spain",
    status: "Обработанные",
    сommission: "2%",
    order_amount: "500.00",
    translation: "Подтвержден",
  },
  {
    id: "7",
    basketNumber: "№518",
    date: "20 Feb, 2022",
    user: "Eva Green",
    items: [
      { id: "item7", name: "Товар 7", quantity: 3, price: 150, imageUrl: "" },
    ],
    country: "Portugal",
    status: "На рассмотрении",
    сommission: "0%",
    order_amount: "0.00",
    translation: "Подтвержден",
  },
  {
    id: "8",
    basketNumber: "№519",
    date: "10 Mar, 2022",
    user: "Frank White",
    items: [
      { id: "item8", name: "Товар 8", quantity: 2, price: 250, imageUrl: "" },
    ],
    country: "Netherlands",
    status: "Обработанные",
    сommission: "4%",
    order_amount: "500.00",
    translation: "Подтвержден",
  },
  {
    id: "9",
    basketNumber: "№520",
    date: "25 Apr, 2022",
    user: "Grace Black",
    items: [
      { id: "item9", name: "Товар 9", quantity: 1, price: 400, imageUrl: "" },
    ],
    country: "Belgium",
    status: "На рассмотрении",
    сommission: "0%",
    order_amount: "0.00",
    translation: "Подтвержден",
  },
  {
    id: "10",
    basketNumber: "№521",
    date: "15 May, 2022",
    user: "Henry Green",
    items: [
      { id: "item10", name: "Товар 10", quantity: 3, price: 120, imageUrl: "" },
    ],
    country: "Switzerland",
    status: "Обработанные",
    сommission: "6%",
    order_amount: "360.00",
    translation: "Подтвержден",
  },
];

const Ordest = () => {
  const [activeTab, setActiveTab] = useState("news");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const pendingOrders = orders.filter(
    (order) => order.status === "На рассмотрении"
  );
  const processedOrders = orders.filter(
    (order) => order.status === "Обработанные"
  );

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
    setActiveTab("Service");
  };

  return (
    <div>
      <AdminHeader />
      <div className="flex">
        <AdminAside />

        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex justify-start mt-4 ml-4 gap-4">
              <TabsTrigger
                value="news"
                className="px-6 py-2 border border-gray-300 rounded-lg transition data-[state=active]:bg-[#FF9500] data-[state=active]:text-white"
              >
                Новые
              </TabsTrigger>
              <TabsTrigger
                value="Service"
                className="px-6 py-2 border border-gray-300 rounded-lg transition data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Обслуживание
              </TabsTrigger>
              <TabsTrigger
                value="Processed"
                className="px-6 py-2 border border-gray-300 rounded-lg transition data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Обработанные
              </TabsTrigger>
            </TabsList>

            <TabsContent
              className="bg-white shadow-md p-6 mt-4 rounded-2xl ml-5"
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
                    <th className="py-3 px-4 border-b text-left">Страна</th>
                    <th className="py-3 px-4 border-b text-left">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(order)}
                    >
                      <td className="py-3 px-4 border-b">
                        {order.basketNumber}
                      </td>
                      <td className="py-3 px-4 border-b">{order.date}</td>
                      <td className="py-3 px-4 border-b">{order.user}</td>
                      <td className="py-3 px-4 border-b">{order.country}</td>
                      <td className="py-3 px-4 border-b">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>

            <TabsContent
              className="bg-white shadow-md p-6 mt-4 rounded-2xl ml-5"
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
                  </tr>
                </thead>
                <tbody>
                  {processedOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">
                        {order.basketNumber}
                      </td>
                      <td className="py-3 px-4 border-b">{order.date}</td>
                      <td className="py-3 px-4 border-b">{order.user}</td>
                      <td className="py-3 px-4 border-b">{order.сommission}</td>
                      <td className="py-3 px-4 border-b">
                        {order.order_amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>

            <TabsContent
              className="bg-white shadow-md p-6 mt-4 rounded-2xl ml-5"
              value="Service"
            >
              {selectedOrder && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Корзина № {selectedOrder.basketNumber}
                  </h2>
                  <p className="text-gray-700">
                    Пользователь: {selectedOrder.user}
                  </p>
                  <p className="text-gray-700">
                    Дата отправки: {selectedOrder.date}
                  </p>
                  <p className="text-gray-700">
                    Страна: {selectedOrder.country}
                  </p>
                  <p className="text-gray-700">
                    Сумма заказа: <strong>{selectedOrder.order_amount}</strong>
                  </p>
                  <div className="mt-6 flex space-x-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                      Подтвердить закуп
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                      Удалить
                    </button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Ordest;
