import React, { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { Button } from "../../components/ui/button";
import { ShoppingCart, Heart, Forward } from "lucide-react";

const Product = () => {
  const { documents: products, error } = useCollection("products");
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [activeButtons, setActiveButtons] = useState<{
    [key: string]: Set<string>;
  }>({});

  if (error) return <p>Ошибка: {error}</p>;
  if (!products) return <p>Загрузка...</p>;

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

  const filteredProducts = products.filter(
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

      {filteredProducts.map((product) => (
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
            {product.photoURLs?.map((photoURL, index) => (
              <img
                key={index}
                src={photoURL}
                className="w-[23%] mb-4"
                alt={`Product ${product.id}`}
              />
            ))}
          </div>

          <div className="mt-4 flex space-x-2">
            {[
              {
                key: "cart",
                icon: <ShoppingCart size={20} />,
                label: "В корзину",
              },
              {
                key: "favorite",
                icon: <Heart size={20} />,
                label: "В избранное",
              },
              { key: "other", icon: <Forward size={20} />, label: "" },
            ].map(({ key, icon, label }) => (
              <Button
                key={key}
                onClick={() => handleClick(product.id, key)}
                className={`rounded-3xl px-4 py-2 flex items-center space-x-2 transition-colors ${
                  activeButtons[product.id]?.has(key)
                    ? "bg-purple-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {icon}
                <span>{label}</span>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
