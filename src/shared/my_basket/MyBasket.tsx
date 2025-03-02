import React, { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { Button } from "../../components/ui/button";
import { Trash, Heart, Forward } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const MyBasket = () => {
  // Получаем данные из Firestore
  const { documents, error } = useCollection("products");

  // Состояние для списка товаров в корзине
  const [basketItems, setBasketItems] = useState<any[]>([]);

  // Состояние для кнопок
  const [activeButtons, setActiveButtons] = useState<{
    [key: string]: { favorite: boolean; other: boolean };
  }>({});

  // Обновляем список товаров при загрузке данных
  useEffect(() => {
    if (documents) {
      console.log("Загруженные данные:", documents); // Логируем загруженные данные
      const filteredItems = documents.filter(
        (item) => item?.inBasket === true && item?.inBasket !== undefined
      );
      console.log("Отфильтрованные товары в корзине:", filteredItems); // Логируем отфильтрованные товары
      setBasketItems(filteredItems);
    }
  }, [documents]);

  // Проверка на ошибки и загрузку
  if (error) return <p className="text-center text-red-500">Ошибка: {error}</p>;
  if (!documents)
    return <p className="text-center text-gray-500">Загрузка...</p>;

  // Проверяем состояние перед рендером
  console.log("basketItems перед рендером:", basketItems); // Проверяем содержимое корзины

  // Удаление товара из корзины
  const handleRemove = async (id: string) => {
    try {
      await updateDoc(doc(db, "products", id), { inBasket: false });
      // Удаляем товар из списка в UI без перезагрузки страницы
      setBasketItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Ошибка при удалении товара:", err);
    }
  };

  return (
    <div className="basket-container p-4">
      {basketItems.length === 0 ? (
        <p className="text-center text-gray-500">Корзина пуста</p>
      ) : (
        basketItems.map((item) => (
          <div
            key={item.id}
            className="basket-item flex gap-4 p-4 border rounded-lg shadow-md mb-4"
          >
            <img
              src={item.photoURLs?.[0] || "/placeholder.jpg"}
              alt={item.name || "Без названия"}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-xs text-left font-semibold">{item.name}</h3>
              <div className="text-gray-500 text-xs flex justify-between w-full">
                <span>{item.time}</span>
                <span>ID: {item.id}</span>
              </div>
              <p className="text-left text-gray-700 text-[9px] mt-2">
                {item.description}
              </p>
              <div className="flex gap-2 mt-3">
                <Button
                  onClick={() => handleRemove(item.id)}
                  className="rounded-3xl px-4 py-2 flex items-center space-x-2 bg-red-500 text-white transition-colors"
                >
                  <Trash size={20} />
                  <span>Удалить</span>
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBasket;
