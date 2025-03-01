import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { MY_BASKET_ITEMS } from "./const";
import MyBasketProps from "./type";
import { ShoppingCart, Heart, Forward } from "lucide-react";

const MyBasket = () => {
  const [basketItems, setBasketItems] =
    useState<MyBasketProps[]>(MY_BASKET_ITEMS);
  const [activeButtons, setActiveButtons] = useState<{
    [key: number]: { cart: boolean; favorite: boolean; other: boolean };
  }>({});

  const handleClick = (id: number, button: string) => {
    setActiveButtons((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [button]: !prevState[id]?.[button],
      },
    }));
  };

  const handleRemove = (id: number) => {
    setBasketItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="basket-container p-4">
      {basketItems.map((item: MyBasketProps) => (
        <div
          key={item.id}
          className="basket-item flex gap-4 p-4 border rounded-lg shadow-md mb-4"
        >
          <img
            src={item.photoURLs[0]}
            alt={item.name}
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
                onClick={() => handleClick(item.id, "favorite")}
                className={`rounded-3xl px-3 py-[6px] flex items-center space-x-2 transition-colors ${
                  activeButtons[item.id]?.favorite
                    ? "bg-purple-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <Heart size={20} />
              </Button>
              <Button
                onClick={() => handleClick(item.id, "other")}
                className={`rounded-3xl px-3 py-[6px] flex items-center space-x-2 transition-colors ${
                  activeButtons[item.id]?.other
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
                <ShoppingCart size={20} />
                <span>Удалить</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBasket;
