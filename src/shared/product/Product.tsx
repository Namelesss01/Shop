import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { ShoppingCart, Heart, Forward } from "lucide-react";
import { PRODUCTS_ITEMS } from "./const";
import { ProductProps } from "./type";

const Product = () => {
  const [activeButtons, setActiveButtons] = useState({
    cart: false,
    favorite: false,
    other: false,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("Все");

  const handleClick = (button: string) => {
    setActiveButtons((prevState) => ({
      ...prevState,
      [button]: !prevState[button],
    }));
  };

  const filteredProducts = PRODUCTS_ITEMS.filter(
    (product) =>
      selectedCategory === "Все" || product.category === selectedCategory
  );

  return (
    <div className="mb-8">
      {/* Фильтрация товаров */}
      <div className="flex space-x-4 my-4">
        <Button
          onClick={() => setSelectedCategory("Все")}
          className={`rounded-3xl px-4 py-2 ${
            selectedCategory === "Все"
              ? "bg-purple-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          Все
        </Button>
        <Button
          onClick={() => setSelectedCategory("Мужской")}
          className={`rounded-3xl px-4 py-2 ${
            selectedCategory === "Мужской"
              ? "bg-purple-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          Мужской
        </Button>
        <Button
          onClick={() => setSelectedCategory("Женский")}
          className={`rounded-3xl px-4 py-2 ${
            selectedCategory === "Женский"
              ? "bg-purple-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          Женский
        </Button>
        <Button
          onClick={() => setSelectedCategory("Детский")}
          className={`rounded-3xl px-4 py-2 ${
            selectedCategory === "Детский"
              ? "bg-purple-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          Детский
        </Button>
      </div>

      {filteredProducts.map((product: ProductProps) => (
        <div key={product.id} className="mb-8">
          <h1 className="font-semibold text-base">{product.name}</h1>
          <div className="flex justify-between">
            <span className="font-normal text-sm text-gray-400">
              {product.time}
            </span>
            <span className="font-normal text-sm text-gray-400">
              ID: {product.id}
            </span>
          </div>
          <p className="font-normal text-sm mb-3">{product.description}</p>

          {/* Отображаем 8 изображений в 4 ряда по 4 изображения */}
          <div className="flex flex-wrap justify-between mt-4">
            {product.photoURLs.map((photoURL, index) => (
              <img
                key={index}
                src={photoURL}
                className="w-[23%] mb-4"
                alt={`Product ${product.id} image ${index + 1}`}
              />
            ))}
          </div>

          {/* Кнопки */}
          <div className="mt-4 flex space-x-2">
            <Button
              onClick={() => handleClick("cart")}
              className={`rounded-3xl px-4 py-2 flex items-center space-x-2 transition-colors ${
                activeButtons.cart
                  ? "bg-purple-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              <ShoppingCart size={20} />
              <span>В корзину</span>
            </Button>

            <Button
              onClick={() => handleClick("favorite")}
              className={`rounded-3xl px-4 py-2 flex items-center space-x-2 transition-colors ${
                activeButtons.favorite
                  ? "bg-purple-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              <Heart size={20} />
              <span>В Избранное</span>
            </Button>

            <Button
              onClick={() => handleClick("other")}
              className={`rounded-3xl px-4 py-2 flex items-center space-x-2 transition-colors ${
                activeButtons.other
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
