import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { ShoppingCart, Forward } from "lucide-react";
import { useCollection, useAddDocument } from "../../hooks/useCollection"; // Импортируем хук для добавления документа

interface Order {
  id: string; // Уникальный идентификатор заказа
  number: number; // Номер заказа
  time: string; // Время создания заказа
  description: string; // Описание заказа
  photoURLs: string[]; // Ссылки на фотографии
  status: string; // Статус заказа
}

const MyApplications = () => {
  const [activeButtons, setActiveButtons] = useState<{
    [key: string]: { cart: boolean; favorite: boolean; other: boolean };
  }>({});

  // Загружаем данные из коллекции "orders" в Firestore
  const { documents: orders, error } = useCollection("orders");

  // Хук для добавления нового заказа
  const { addDocument, error: addError } = useAddDocument("orders");

  const [photoOrders, setPhotoOrders] = useState<string[][]>([]);

  // Инициализируем photoOrders после загрузки данных
  React.useEffect(() => {
    if (orders) {
      setPhotoOrders(orders.map((order) => order.photoURLs || []));
    }
  }, [orders]);

  const handleClick = (id: string, button: string) => {
    setActiveButtons((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [button]: !prevState[id]?.[button],
      },
    }));
  };

  const handleImageClick = (itemIndex: number, imageIndex: number) => {
    setPhotoOrders((prevOrders) => {
      const newOrder = [...prevOrders];
      const itemPhotos = [...newOrder[itemIndex]];
      const clickedPhoto = itemPhotos.splice(imageIndex, 1)[0];
      itemPhotos.unshift(clickedPhoto);
      newOrder[itemIndex] = itemPhotos;
      return newOrder;
    });
  };

  // Функция для добавления нового заказа
  const handleAddOrder = async () => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9), // Генерация уникального ID
      number: orders ? orders.length + 1 : 1, // Номер заказа
      time: new Date().toLocaleString(), // Текущее время
      description: "Новый заказ", // Описание заказа
      photoURLs: ["https://via.placeholder.com/150"], // Пример ссылок на фотографии
      status: "На рассмотрении", // Статус по умолчанию
    };

    try {
      await addDocument(newOrder); // Добавляем заказ в Firestore
      console.log("Заказ успешно добавлен!");
    } catch (err) {
      console.error("Ошибка при добавлении заказа:", err);
    }
  };

  if (error) return <p className="text-center text-red-500">Ошибка: {error}</p>;
  if (!orders)
    return <p className="text-center text-gray-500">Загрузка заявок...</p>;

  return (
    <div className="basket-container p-4">
      {/* Кнопка для добавления нового заказа */}
      <Button
        onClick={handleAddOrder}
        className="mb-4 bg-purple-500 text-white hover:bg-purple-600"
      >
        Добавить заказ
      </Button>

      {orders.map((order: Order, itemIndex) => (
        <div
          key={order.id}
          className="basket-item flex gap-4 p-4 border rounded-lg shadow-md mb-4"
        >
          <div className="relative w-32 h-32">
            {photoOrders[itemIndex]?.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={order.description}
                className={`absolute w-9 h-12 object-cover rounded-lg transition-all duration-300 shadow-lg cursor-pointer ${
                  index === 0 ? "z-10" : "z-0"
                }`}
                style={{ top: index * 10, left: index * 10 }}
                onClick={() => handleImageClick(itemIndex, index)}
              />
            ))}
          </div>
          <div className="flex-1">
            <h3 className="text-xs text-left font-semibold">
              Заявка {order.number}
            </h3>
            <div className="text-gray-500 text-xs flex justify-between w-full">
              <span>{order.time}</span>
              <span>ID: {order.id}</span>
            </div>
            <p className="text-left text-gray-700 text-[9px] mt-2">
              {order.description}
            </p>
            <div className="flex gap-2 mt-3">
              <Button
                onClick={() => handleClick(order.id, "other")}
                className={`rounded-3xl px-3 py-[6px] flex items-center space-x-2 transition-colors ${
                  activeButtons[order.id]?.other
                    ? "bg-purple-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <Forward size={20} />
              </Button>
              <Button
                onClick={() => handleClick(order.id, "cart")}
                className={`rounded-3xl px-4 py-2 flex items-center space-x-2 transition-colors ${
                  activeButtons[order.id]?.cart
                    ? "bg-purple-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <ShoppingCart size={20} />
                <span>Связаться</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyApplications;
