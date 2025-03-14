import React, { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { Button } from "../../components/ui/button";
import { Heart, Forward, ShoppingCart } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { ref, getDownloadURL } from "firebase/storage";

const Product = ({ selectedCategory, searchQuery }) => {
  const { documents: products, error } = useCollection("products");
  const [productsWithUrls, setProductsWithUrls] = useState([]);
  const [selectedCategoryState, setSelectedCategory] = useState(selectedCategory);

  useEffect(() => {
    if (products) {
      const fetchImageUrls = async () => {
        const updatedProducts = await Promise.all(
          products.map(async (product) => {
            if (product.photoURLs && product.photoURLs.length > 0) {
              try {
                const photoURLs = await Promise.all(
                  product.photoURLs.map(async (photoPath) => {
                    if (photoPath.startsWith("http")) {
                      return photoPath; // Если уже полный URL, возвращаем как есть
                    }
                    const photoRef = ref(storage, photoPath);
                    return await getDownloadURL(photoRef);
                  })
                );
                return { ...product, photoURLs };
              } catch (error) {
                console.error(
                  `Error fetching image for product ${product.id}:`,
                  error
                );
                return product;
              }
            }
            return product;
          })
        );
        setProductsWithUrls(updatedProducts);
      };

      fetchImageUrls();
    }
  }, [products]);

  if (error) return <p>Ошибка: {error}</p>;
  if (!productsWithUrls.length) return <p>Загрузка...</p>;

  const handleBasketToggle = async (productId, inBasket) => {
    // Обновляем состояние кнопки сразу
    const updatedProducts = productsWithUrls.map((product) =>
      product.id === productId ? { ...product, inBasket: !inBasket } : product
    );
    setProductsWithUrls(updatedProducts); // Обновляем UI немедленно

    // Обновляем данные в Firebase
    try {
      await updateDoc(doc(db, "products", productId), {
        inBasket: !inBasket,
      });
    } catch (error) {
      console.error("Ошибка при обновлении корзины:", error);
    }
  };

  const handleFavoriteToggle = async (productId, isFavorite) => {
    // Обновляем состояние кнопки сразу
    const updatedProducts = productsWithUrls.map((product) =>
      product.id === productId ? { ...product, isFavorite: !isFavorite } : product
    );
    setProductsWithUrls(updatedProducts); // Обновляем UI немедленно

    // Обновляем данные в Firebase
    try {
      await updateDoc(doc(db, "products", productId), {
        isFavorite: !isFavorite,
      });
    } catch (error) {
      console.error("Ошибка при обновлении избранного:", error);
    }
  };

  const handleShareToggle = async (productId, product) => {
    // Формируем корректную ссылку на продукт
    const productLink = `https://yourwebsite.com/products/${productId}`; // Убедитесь, что это правильный путь
    const message = `Проверьте этот продукт: ${productLink}`;

    console.log("Sharing product link:", productLink); // Логируем ссылку для отладки

    if (navigator.share) {
      try {
        // Открываем диалоговое окно выбора приложения для обмена
        await navigator.share({
          title: product.name,
          text: message,
          url: productLink,
        });
      } catch (error) {
        console.error("Ошибка при попытке использовать share API", error);
      }
    } else {
      alert("Ваш браузер не поддерживает функцию share.");
    }
  };

  // Фильтрация продуктов по категории и тексту поиска
  const filteredProducts = productsWithUrls.filter(
    (product) =>
      (selectedCategoryState === "Все" || product.category === selectedCategoryState) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Фильтрация по поисковому запросу
  );

  return (
    <div className="mb-8">
      {/* Фильтрация по категориям */}
      <div className="flex space-x-4 my-4">
        {["Все", "Мужской", "Женский", "Детский"].map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-3xl px-4 py-2 transition-colors ${
              selectedCategoryState === category
                ? "bg-purple-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Отображение отфильтрованных продуктов */}
      {filteredProducts.map((product) => (
        <div key={product.id} className="mb-8">
          <h1 className="font-semibold text-base">{product.name}</h1>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{product.time}</span>
            <span>ID: {product.id}</span>
          </div>
          <p className="text-sm mb-3">{product.description}</p>

          <div className="flex flex-wrap mt-4">
            {product.photoURLs?.map((photoURL, index) => (
              <img
                key={index}
                src={photoURL}
                className="w-20 h-[100px] mb-4 mr-2"
                alt={`Product ${product.id}`}
              />
            ))}
          </div>

          <div className="mt-4 flex space-x-2">
            <Button
              onClick={() => handleBasketToggle(product.id, product.inBasket)}
              className={`rounded-3xl px-4 py-2 flex items-center space-x-2 transition-colors ${
                product.inBasket ? "bg-purple-500 text-white" : "bg-gray-300 text-black"
              }`}
            >
              <ShoppingCart size={20} />
              <span>{product.inBasket ? "Удалить из корзины" : "В корзину"}</span>
            </Button>

            <Button
              onClick={() => handleFavoriteToggle(product.id, product.isFavorite)}
              className={`rounded-3xl px-4 py-2 flex items-center space-x-2 transition-colors ${
                product.isFavorite ? "bg-purple-500 text-white" : "bg-gray-300 text-black"
              }`}
            >
              <Heart size={20} />
              <span>{product.isFavorite ? "Удалить" : "В избранное"}</span>
            </Button>

            <Button
              onClick={() => handleShareToggle(product.id, product)}
              className={`rounded-3xl px-4 py-2 flex items-center space-x-2 transition-colors ${
                product.isShared ? "bg-purple-500 text-white" : "bg-gray-300 text-black"
              }`}
            >
              <Forward size={20} />
              <span>{product.isShared ? "Отправить" : "Поделиться"}</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;