import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Auth } from "../authorization/Auth";
import BurgerMenuProps from "./type";
import useAuthStatus from "../../hooks/useAuthStatus";

const BurgerMenu = ({ triggerIcon }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuthStatus();

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer z-50">
        {triggerIcon}
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 w-72 h-full bg-white shadow-lg p-6 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Настройки</h2>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Аккаунт</h3>
          {isLoggedIn ? (
            // Показываем "Профиль", если пользователь авторизован
            <Link
              to="/profile"
              className="flex justify-between items-center py-2 text-gray-800 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Профиль <span className="text-xl">›</span>
            </Link>
          ) : (
            // Показываем "Войти", если пользователь не авторизован
            <Auth>
              <Button>Войти</Button>
            </Auth>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700">Прочее</h3>
          <Link
            to="/offer"
            className="flex justify-between items-center py-2 text-gray-800 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Оферта <span className="text-green-600">Ознакомлен(а)</span>{" "}
            <span className="text-xl">›</span>
          </Link>
          <Link
            to="/instructions"
            className="flex justify-between items-center py-2 text-gray-800 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Инструкции <span className="text-xl">›</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
