import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { MY_APPLICATION_ITEMS } from "./const";
import MyApplicationsProps from "./type";
import { ShoppingCart, Heart, Forward } from "lucide-react";

const MyApplications = () => {
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

  return (
    <div className="applications-container p-4">
      {MY_APPLICATION_ITEMS.map((item: MyApplicationsProps) => (
        <div
          key={item.number}
          className="application-item flex gap-4 p-4 border rounded-lg shadow-md mb-4"
        >
          <img
            src={item.photoURLs[0]}
            alt={item.description}
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div>
            <h3 className="text-xs text-left font-semibold">
              Корзина №{item.number}
            </h3>
            <div className="text-gray-500 text-xs flex justify-between w-full">
              <span>{item.time}</span>
            </div>
            <p className="text-left text-gray-700 text-[9px] mt-2">
              {item.description}
            </p>
            <div className="flex gap-16 mt-3">
              <Button
                onClick={() => handleClick(item.number, "other")}
                className={`rounded-3xl px-3 py-[6px] flex items-center space-x-2 transition-colors ${
                  activeButtons[item.number]?.other
                    ? "bg-purple-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <Forward size={20} />
              </Button>
              <Button
                onClick={() => handleClick(item.number, "cart")}
                className={`rounded-3xl px-4 py-2 flex items-center space-x-2 transition-colors ${
                  activeButtons[item.number]?.cart
                    ? "bg-purple-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <span>Связаться</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyApplications;
