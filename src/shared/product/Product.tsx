import React, { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { Button } from "../../components/ui/button";
import { Heart, Forward, ShoppingCart } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { ref, getDownloadURL } from "firebase/storage";

const Product = () => {
  const { documents: products, error } = useCollection("products");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [productsWithUrls, setProductsWithUrls] = useState([]);

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
    await updateDoc(doc(db, "products", productId), { inBasket: !inBasket });
  };

  const handleFavoriteToggle = async (productId, isFavorite) => {
    await updateDoc(doc(db, "products", productId), {
      isFavorite: !isFavorite,
    });
  };

  const handleShareToggle = async (productId, isShared) => {
    await updateDoc(doc(db, "products", productId), { isShared: !isShared });
  };

  const filteredProducts = productsWithUrls.filter(
    (product) =>
      selectedCategory === "Все" || product.category === selectedCategory
  );

  return (
    <div className="mb-8">
      <div className="flex space-x-4 my-4">
        {["Все", "Мужской", "Женский", "Детский"].map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-3xl px-4 py-2 transition-colors ${
              selectedCategory === category
                ? "bg-purple-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {filteredProducts.map((product) => (
        <div key={product.id} className="mb-8">
          <h1 className="font-semibold text-base">{product.name}</h1>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{product.time}</span>
            <span>ID: {product.id}</span>
          </div>
          <p className="text-sm mb-3">{product.description}</p>

          <div className="flex flex-wrap justify-between mt-4">
            {product.photoURLs?.map((photoURL, index) => (
              <img
                key={index}
                src={photoURL}
                className="w-[23%] mb-4 rounded-lg"
                alt={`Product ${product.id}`}
              />
            ))}
          </div>

          <div className="mt-4 flex space-x-2">
            <Button
              onClick={() => handleBasketToggle(product.id, product.inBasket)}
              className={`rounded-3xl px-4 py-2 flex items-center space-x-2 transition-colors ${
                product.inBasket
                  ? "bg-purple-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              <ShoppingCart size={20} />
              <span>{product.inBasket ? "В корзине" : "В корзину"}</span>
            </Button>

            <Button
              onClick={() =>
                handleFavoriteToggle(product.id, product.isFavorite)
              }
              className={`rounded-3xl px-4 py-2 flex items-center space-x-2 transition-colors ${
                product.isFavorite
                  ? "bg-purple-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              <Heart size={20} />
              <span>{product.isFavorite ? "Удалить" : "В избранное"}</span>
            </Button>

            <Button
              onClick={() => handleShareToggle(product.id, product.isShared)}
              className={`rounded-3xl px-4 py-2 flex items-center space-x-2 transition-colors ${
                product.isShared
                  ? "bg-purple-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              <Forward size={20} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
