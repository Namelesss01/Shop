import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Auth } from "../authorization/Auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { signOut } from "firebase/auth";
import useAuthStatus from "../../hooks/useAuthStatus";

const BurgerMenu = ({ triggerIcon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user } = useAuthStatus();
  const [userData, setUserData] = useState({
    isOfferAcknowledged: false,
    isInstructionsAcknowledged: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    setIsOpen(false);
    navigate("/");
  };

  const acknowledge = async (field) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { [field]: true });
      setUserData((prev) => ({ ...prev, [field]: true }));
    }
  };

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
            <>
              <Link
                to="/Profile"
                className="flex justify-between items-center py-2 text-gray-800 hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Профиль <span className="text-xl">›</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full mt-3 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Выйти
              </button>
            </>
          ) : (
            <Auth>
              <Button>Войти</Button>
            </Auth>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700">Прочее</h3>
          <div className="flex justify-between items-center py-2 text-gray-800">
            <Link to="/oferta" onClick={() => setIsOpen(false)}>
              Оферта
            </Link>
            {userData.isOfferAcknowledged ? (
              <span className="text-green-600">Ознакомлен(а)</span>
            ) : (
              <button
                className="text-blue-500"
                onClick={() => acknowledge("isOfferAcknowledged")}
              >
                Ознакомиться
              </button>
            )}
          </div>
          <div className="flex justify-between items-center py-2 text-gray-800">
            <Link to="/instructions" onClick={() => setIsOpen(false)}>
              Инструкции
            </Link>
            {userData.isInstructionsAcknowledged ? (
              <span className="text-green-600">Ознакомлен(а)</span>
            ) : (
              <button
                className="text-blue-500"
                onClick={() => acknowledge("isInstructionsAcknowledged")}
              >
                Ознакомиться
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
