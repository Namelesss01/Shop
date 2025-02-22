import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { MY_APPLICATION_ITEMS } from "./const";
import MyApplicationsProps from "./type";
import { ShoppingCart, Forward } from "lucide-react";

const MyApplications = () => {
  const [activeButtons, setActiveButtons] = useState<{
    [key: number]: { cart: boolean; favorite: boolean; other: boolean };
  }>({});

  const [photoOrders, setPhotoOrders] = useState(
    MY_APPLICATION_ITEMS.map((item) => item.photoURLs)
  );

  const handleClick = (id: number, button: string) => {
    setActiveButtons((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [button]: !prevState[id]?.[button],
      },
    }));
  };

  const handleImageClick = (itemIndex: number, imageIndex: number) => {
    setPhotoOrders((prevOrders) => {
      const newOrder = [...prevOrders];
      const itemPhotos = [...newOrder[itemIndex]];
      const clickedPhoto = itemPhotos.splice(imageIndex, 1)[0];
      itemPhotos.unshift(clickedPhoto);
      newOrder[itemIndex] = itemPhotos;
      return newOrder;
    });
  };

  return (
    <div className="basket-container p-4">
      {MY_APPLICATION_ITEMS.map((item: MyApplicationsProps, itemIndex) => (
        <div
          key={item.number}
          className="basket-item flex gap-4 p-4 border rounded-lg shadow-md mb-4"
        >
          <div className="relative w-32 h-32">
            {photoOrders[itemIndex].map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={item.description}
                className={`absolute w-9 h-12 object-cover rounded-lg transition-all duration-300 shadow-lg cursor-pointer ${
                  index === 0 ? "z-10" : "z-0"
                }`}
                style={{ top: index * 10, left: index * 10 }}
                onClick={() => handleImageClick(itemIndex, index)}
              />  
            ))}
          </div>
          <div className="flex-1">
            <h3 className="text-xs text-left font-semibold">
              Корзина {item.number}
            </h3>
            <div className="text-gray-500 text-xs flex justify-between w-full">
              <span>{item.time}</span>
              <span>ID: {item.number}</span>
            </div>
            <p className="text-left text-gray-700 text-[9px] mt-2">
              {item.description}
            </p>
            <div className="flex gap-2 mt-3">
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
                <ShoppingCart size={20} />
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
