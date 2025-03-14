import React, { useState } from "react";
import AdminAside from "../../shared/admin_aside/AdminAside";
import AdminHeader from "../../shared/admin_header/AdminHeader";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { useCollection } from "../../hooks/useCollection";

interface Order {
  id: string;
  basketNumber: string;
  date: string;
  user: string;
  items: number;
  country: string;
  status: string; // Статус заказа
  сommission: string;
  order_amount: string;
  translation: string;
}

const Ordest = () => {
  const { documents: orders, error } = useCollection("orders");
  const [activeTab, setActiveTab] = useState("news");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (error) return <p className="text-center text-red-500">Ошибка: {error}</p>;
  if (!orders)
    return <p className="text-center text-gray-500">Загрузка заказов...</p>;

  // Фильтруем заказы по статусу
  const pendingOrders = orders.filter(
    (order) => order.status === "На рассмотрении"
  );
  const processedOrders = orders.filter(
    (order) => order.status !== "На рассмотрении"
  );

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
    setActiveTab("Service");
  };

  const handleConfirmPurchase = (orderId: string) => {
    // Здесь можно добавить логику для обновления статуса заказа в Firestore
    // Например, изменить статус на "Обработанные"
    // После этого заказ автоматически переместится во вторую вкладку
    console.log("Заказ подтвержден:", orderId);
  };

  return (
    <div className="">
      <AdminHeader />
      <div className="flex">
        <AdminAside />

        <div className="">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                  {pendingOrders.map((order: Order) => (
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
                  {processedOrders.map((order: Order) => (
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
                      <td className="py-3 px-4 border-b">
                        {order.translation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>
            <TabsContent
              className="bg-white shadow-md pl-6 pr-4 py-6 mt-4 ml-4 rounded-2xl"
              value="Service"
            >
              {selectedOrder && (
                <div className="p-6 bg-gray-100 rounded-lg">
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
                  <p className="text-gray-700">
                    Комиссия: <strong>{selectedOrder.сommission}</strong>
                  </p>
                  <p className="text-gray-700">
                    Итоговая сумма:{" "}
                    <strong>{selectedOrder.order_amount}</strong>
                  </p>

                  <div className="mt-6 bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium">Товары</h3>
                    <div className="flex space-x-4 mt-4">
                      {[1, 2, 3, 4, 5].map((_, index) => (
                        <img
                          key={index}
                          src="/placeholder.jpg"
                          alt="Product"
                          className="w-24 h-32 object-cover rounded-lg border"
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-gray-700">
                      Описание товара: Платье голубое, размер 50-56.
                    </p>
                  </div>

                  <div className="mt-6 bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium">
                      Комментарии покупателя
                    </h3>
                    <p className="text-gray-700">
                      Нужно по три на каждую позицию. Размерный ряд: 50-56.
                    </p>
                  </div>

                  <div className="mt-6 bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium">Контакты</h3>
                    <p className="text-gray-700">WhatsApp: +99670700433</p>
                    <p className="text-gray-700">Telegram: @marleno</p>
                  </div>

                  <div className="mt-6 flex space-x-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                      На рассмотрение
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => handleConfirmPurchase(selectedOrder.id)}
                    >
                      Подтвердить закуп
                    </button>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                      Отмена заказа
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                      Удалить из корзины
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
