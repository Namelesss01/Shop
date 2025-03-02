import React, { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { Button } from "../../components/ui/button";
import { Heart } from "lucide-react";
import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

const Favorites = () => {
  const { documents: products, error } = useCollection("products");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  if (error) return <p>Ошибка: {error}</p>;
  if (!products) return <p>Загрузка...</p>;

  // Отфильтровываем продукты с isFavorite === true
  const filteredFavorites = products.filter((product) => product.isFavorite);

  const handleFavoriteToggle = async (productId: string) => {
    // Сначала обновляем состояние локально, чтобы UI обновился сразу
    const updatedFavorites = !favorites[productId];
    setFavorites((prev) => ({
      ...prev,
      [productId]: updatedFavorites,
    }));

    // Обновляем поле isFavorite в базе данных
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, { isFavorite: updatedFavorites });

    // Перезагружаем блок, обновив состояние избранных товаров
    // Таким образом, отобразится актуальный список избранных товаров
    // В случае, если вы используете useCollection, оно обновит данные автоматически
  };

  return (
    <div className="container mx-auto max-w-[375px]">
      <h1 className="font-semibold text-xl mb-4">Избранные товары</h1>
      {filteredFavorites.length === 0 ? (
        <p>Нет избранных товаров.</p>
      ) : (
        filteredFavorites.map((product) => (
          <div key={product.id} className="mb-4">
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm">{product.description}</p>
            <div className="mt-4 flex space-x-2">
              <Button
                onClick={() => handleFavoriteToggle(product.id)}
                className={`rounded-3xl px-4 py-2 flex items-center space-x-2 transition-colors ${
                  product.isFavorite
                    ? "bg-purple-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <Heart size={20} />
                <span>
                  {product.isFavorite ? "Удалить из избранного" : "В избранное"}
                </span>
              </Button>
            </div>
            {/* Можно добавить фотографии и другие детали товара */}
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
