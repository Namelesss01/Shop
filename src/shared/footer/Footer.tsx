import React from "react";
import { Home, Heart, ShoppingCart, CircleEllipsis } from "lucide-react"; // Импортируем иконки
import { Link, useLocation } from "react-router-dom"; // Импортируем Link и useLocation из react-router-dom

const Footer = () => {
  const location = useLocation(); // Получаем текущий путь

  // Функция для определения активной кнопки
  const getActiveButton = (path: string) => {
    return location.pathname === path ? "text-purple-500" : "";
  };

  return (
    <div className="w-full py-4 bg-white text-gray-200 fixed bottom-0 left-0">
      <div className="flex justify-around items-center">
        {/* Иконка Дом */}
        <Link
          to="/" // Переход на главную страницу
          className={`flex flex-col items-center cursor-pointer ${getActiveButton("/")}`}
        >
          <Home size={24} />
          <span className="text-sm mt-2">Дом</span>
        </Link>

        {/* Иконка Сердце */}
        <Link
          to="/favorites" // Переход на страницу "Избранное"
          className={`flex flex-col items-center cursor-pointer ${getActiveButton("/favorites")}`}
        >
          <Heart size={24} />
          <span className="text-sm mt-2">Избранное</span>
        </Link>

        {/* Иконка Корзина */}
        <Link
          to="/basket" // Переход на страницу "Корзина"
          className={`flex flex-col items-center cursor-pointer ${getActiveButton("/basket")}`}
        >
          <ShoppingCart size={24} />
          <span className="text-sm mt-2">Корзина</span>
        </Link>

        {/* Иконка Информация */}
        <Link
          to="/more" // Переход на страницу "Информация"
          className={`flex flex-col items-center cursor-pointer ${getActiveButton("/more")}`}
        >
          <CircleEllipsis size={24} className="rotate-90" />
          <span className="text-sm mt-2">Ещё</span>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
