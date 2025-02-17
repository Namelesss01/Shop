import React, { useState } from "react";
import { Home, Heart, ShoppingCart, CircleEllipsis } from "lucide-react"; // Импортируем иконки
import { Link } from "react-router-dom"; // Импортируем Link из react-router-dom

const Footer = () => {
  const [activeButton, setActiveButton] = useState<string>("");

  const handleClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <div className="w-full py-4 bg-white text-gray-200 fixed bottom-0 left-0">
      <div className="flex justify-around items-center">
        {/* Иконка Дом */}
        <Link
          to="/" // Переход на главную страницу
          className={`flex flex-col items-center cursor-pointer ${
            activeButton === "home" ? "text-purple-500" : ""
          }`}
          onClick={() => handleClick("home")}
        >
          <Home size={24} />
          <span className="text-sm mt-2">Дом</span>
        </Link>

        {/* Иконка Сердце */}
        <Link
          to="/favorites" // Переход на страницу "Избранное"
          className={`flex flex-col items-center cursor-pointer ${
            activeButton === "favorite" ? "text-purple-500" : ""
          }`}
          onClick={() => handleClick("favorite")}
        >
          <Heart size={24} />
          <span className="text-sm mt-2">Избранное</span>
        </Link>

        {/* Иконка Корзина */}
        <Link
          to="/cart" // Переход на страницу "Корзина"
          className={`flex flex-col items-center cursor-pointer ${
            activeButton === "cart" ? "text-purple-500" : ""
          }`}
          onClick={() => handleClick("cart")}
        >
          <ShoppingCart size={24} />
          <span className="text-sm mt-2">Корзина</span>
        </Link>

        {/* Иконка Информация */}
        <Link
          to="/info" // Переход на страницу "Информация"
          className={`flex flex-col items-center cursor-pointer ${
            activeButton === "info" ? "text-purple-500" : ""
          }`}
          onClick={() => handleClick("info")}
        >
          <CircleEllipsis size={24} className="rotate-90" />
          <span className="text-sm mt-2">Ещё</span>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
