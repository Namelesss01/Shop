import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { ShoppingCart, Heart, Forward } from "lucide-react";
import { PRODUCTS_ITEMS } from "./const";
import { ProductProps } from "./type";

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [activeButtons, setActiveButtons] = useState<{
    [key: string]: Set<string>;
  }>({});

  const handleClick = (productId: string, button: string) => {
    setActiveButtons((prevState) => {
      const updatedSet = new Set(prevState[productId] || []);
      if (updatedSet.has(button)) {
        updatedSet.delete(button);
      } else {
        updatedSet.add(button);
      }
      return { ...prevState, [productId]: updatedSet };
    });
  };

  const filteredProducts = PRODUCTS_ITEMS.filter(
    (product) =>
      selectedCategory === "Все" || product.category === selectedCategory
  );

  return (
    <div className="mb-8">
      {/* Фильтрация товаров */}
      <div className="flex space-x-4 my-4">
        {["Все", "Мужской", "Женский", "Детский"].map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-3xl px-4 py-2 ${
              selectedCategory === category
                ? "bg-purple-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {category}
          </Button>
        ))}
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

          <div className="mt-4 flex space-x-2">
            {["cart", "favorite", "other"].map((button) => (
              <Button
                key={button}
                onClick={() => handleClick(product.id, button)}
                className={`rounded-3xl px-4 py-2 flex items-center space-x-2 transition-colors ${
                  activeButtons[product.id]?.has(button)
                    ? "bg-purple-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {button === "cart" && <ShoppingCart size={20} />}
                {button === "favorite" && <Heart size={20} />}
                {button === "other" && <Forward size={20} />}
                <span>
                  {button === "cart"
                    ? "В корзину"
                    : button === "favorite"
                    ? "В Избранное"
                    : ""}
                </span>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
