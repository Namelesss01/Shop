import React, { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { Button } from "../../components/ui/button";
import { Trash, Heart, Forward } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const MyBasket = () => {
  const { documents, error } = useCollection("products");
  const [basketItems, setBasketItems] = useState<any[]>([]);

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

  return (
    <div className="basket-container">
      {basketItems.length === 0 ? (
        <p className="text-center text-gray-500">Корзина пуста</p>
      ) : (
        basketItems.map((item) => (
          <div key={item.id} className="basket-item flex gap-4 mb-4">
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
    </div>
  );
};

export default MyBasket;
