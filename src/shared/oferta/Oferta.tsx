import React, { useState } from "react";
import useAuthStatus from "../../hooks/useAuthStatus";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const Oferta = ({ closeBurgerMenu }: { closeBurgerMenu: () => void }) => {
  const { user } = useAuthStatus();
  const [isOfferAcknowledged, setIsOfferAcknowledged] = useState(false);
  const navigate = useNavigate();

  const handleAcknowledge = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { isOfferAcknowledged: true });
      setIsOfferAcknowledged(true);

      // Закрыть бургер-меню
      closeBurgerMenu();

      // Перенаправить пользователя назад
      navigate(-1);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Оферат</h2>
      <p className="mb-4">
        qweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqwe
      </p>
      <div className="mt-6">
        {isOfferAcknowledged ? (
          <span className="text-green-600 font-semibold">
            Вы ознакомились с офертой
          </span>
        ) : (
          <button
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleAcknowledge}
          >
            Ознакомиться с офертой
          </button>
        )}
      </div>
    </div>
  );
};

export default Oferta;
