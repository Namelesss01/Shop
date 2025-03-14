import React, { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { Button } from "../../components/ui/button";
import { Trash, Heart, Forward } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore"; // Импортируем хук для работы с Firestore

const MyBasket = () => {
  const { documents, error } = useCollection("products");
  const [basketItems, setBasketItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // Для хранения ID выделенных элементов
  const { addDocument } = useFirestore("orders"); // Используем хук для добавления заказов

  useEffect(() => {
    if (documents) {
      console.log("Загруженные данные:", documents);
      const filteredItems = documents.filter(
        (item) => item?.inBasket === true && item?.inBasket !== undefined
      );
      console.log("Отфильтрованные товары в корзине:", filteredItems);
      setBasketItems(filteredItems);
    }
  }, [documents]);

  if (error) return <p className="text-center text-red-500">Ошибка: {error}</p>;
  if (!documents)
    return <p className="text-center text-gray-500">Загрузка...</p>;

  console.log("basketItems перед рендером:", basketItems);

  const handleRemove = async (id: string) => {
    try {
      await updateDoc(doc(db, "products", id), { inBasket: false });
      setBasketItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Ошибка при удалении товара:", err);
    }
  };

  const handleFavoriteToggle = async (id: string, isFavorite: boolean) => {
    try {
      await updateDoc(doc(db, "products", id), { isFavorite: !isFavorite });
    } catch (err) {
      console.error("Ошибка при обновлении избранного:", err);
    }
  };

  const handleShareToggle = async (id: string, isShared: boolean) => {
    try {
      await updateDoc(doc(db, "products", id), { isShared: !isShared });
    } catch (err) {
      console.error("Ошибка при обновлении статуса шаринга:", err);
    }
  };

  const handleDoubleClick = (id: string) => {
    // Если элемент уже выделен, убираем его из выделенных
    if (selectedItems.includes(id)) {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      // Иначе добавляем его в выделенные
      setSelectedItems((prev) => [...prev, id]);
    }
  };

  const handleClick = (id: string) => {
    // Если элемент выделен, убираем его из выделенных
    if (selectedItems.includes(id)) {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const handleOrder = async () => {
    try {
      // Фильтруем выбранные товары
      const selectedProducts = basketItems.filter((item) =>
        selectedItems.includes(item.id)
      );

      // Добавляем каждый выбранный товар в коллекцию `orders`
      for (const product of selectedProducts) {
        await addDocument({
          ...product, // Все данные товара
          orderDate: new Date(), // Добавляем дату заказа
        });

        // Убираем товар из корзины (устанавливаем inBasket в false)
        await updateDoc(doc(db, "products", product.id), { inBasket: false });
      }

      // Обновляем локальное состояние корзины
      setBasketItems((prevItems) =>
        prevItems.filter((item) => !selectedItems.includes(item.id))
      );

      // Очищаем выбранные товары после оформления заказа
      setSelectedItems([]);
      alert("Заказ успешно оформлен!");
    } catch (err) {
      console.error("Ошибка при оформлении заказа:", err);
      alert("Произошла ошибка при оформлении заказа.");
    }
  };

  return (
    <div className="basket-container">
      {basketItems.length === 0 ? (
        <p className="text-center text-gray-500">Корзина пуста</p>
      ) : (
        basketItems.map((item) => (
          <div
            key={item.id}
            className={`basket-item flex gap-4 mb-4 p-4 rounded-lg transition-colors ${
              selectedItems.includes(item.id) ? "bg-gray-200" : "bg-white"
            }`}
            onDoubleClick={() => handleDoubleClick(item.id)} // Двойной клик для выделения
            onClick={() => handleClick(item.id)} // Одиночный клик для снятия выделения
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
                  onClick={() => handleFavoriteToggle(item.id, item.isFavorite)}
                  className={`rounded-3xl px-4 py-2 flex items-center space-x-2 transition-colors ${
                    item.isFavorite
                      ? "bg-purple-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  <Heart size={20} />
                </Button>
                <Button
                  onClick={() => handleShareToggle(item.id, item.isShared)}
                  className={`rounded-3xl px-4 py-2 flex items-center space-x-2 transition-colors ${
                    item.isShared
                      ? "bg-purple-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  <Forward size={20} />
                </Button>
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

      {/* Кнопка "Оформить заказ" внизу страницы */}
      {selectedItems.length > 0 && (
        <div className="bottom-0 -pt-10 left-0 right-0 bg-white p-4 border-t shadow-lg">
          <Button
            onClick={handleOrder}
            className="w-full bg-green-500 text-white rounded-lg -mt-20 py-10"
          >
            Оформить заказ ({selectedItems.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyBasket;
