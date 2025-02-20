import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import Ava from "@/assets/img/avatar.png";
import { Button } from "../../components/ui/button";
import { X } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    phone: "",
    password: "",
    country: "",
    city: "",
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Состояние загрузки
  const [isEditing, setIsEditing] = useState<boolean>(false); // Состояние редактирования

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            displayName: data?.displayName || "",
            email: data?.email || "",
            phone: data?.phone || "",
            password: data?.password || "",
            country: data?.country || "",
            city: data?.city || "",
          });
        }
        setLoading(false); // Убираем состояние загрузки
      } else {
        setLoading(false); // Убираем состояние загрузки, если пользователь не найден
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = async () => {
    if (userId) {
      await updateDoc(doc(db, "users", userId), userData);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true); // Включаем режим редактирования
  };

  const handleSaveClick = async () => {
    if (userId) {
      await updateDoc(doc(db, "users", userId), userData); // Сохраняем изменения в БД
      setIsEditing(false); // Отключаем режим редактирования
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Go back one page in history
  };

  if (loading) {
    return <div>Загрузка...</div>; // Отображение индикатора загрузки, пока данные загружаются
  }

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-2xl mb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-1">Ваш профиль</h2>
        <button
          className="text-gray-500 hover:text-gray-800"
          onClick={handleBackClick}
        >
          <X size={24} /> {/* Cross icon */}
        </button>
      </div>
      <span>Аватарка</span>
      <div className="flex flex-col items-center mb-6">
        <div className="mr-60 relative border-8 border-white rounded-full shadow-md w-24 h-24">
          <img
            src={Ava}
            alt="Аватарка"
            className="w-full h-full rounded-full object-cover"
          />
          <button
            className="absolute top-0 left-16 bg-purple-500 text-white p-1 rounded-full shadow-md"
            onClick={handleEditClick} // Редактирование профиля
          >
            <Pencil size={16} />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          name="displayName"
          value={userData.displayName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="ФИО"
          className="w-full p-3 border border-gray-300 rounded-lg bg-purple-100"
          disabled={!isEditing} // Если не в режиме редактирования, то поле заблокировано
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Электронная почта"
          className="w-full p-3 border border-gray-300 rounded-lg bg-purple-100"
          disabled={!isEditing} // Разрешить редактирование только при isEditing = true
        />
        <input
          type="tel"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Номер для смс"
          className="w-full p-3 border border-gray-300 rounded-lg bg-purple-100"
          disabled={!isEditing} // Если не в режиме редактирования, то поле заблокировано
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Придумайте пароль"
          className="w-full p-3 border border-gray-300 rounded-lg bg-purple-100"
          disabled={!isEditing} // Если не в режиме редактирования, то поле заблокировано
        />
      </div>
      <h3 className="mt-5 font-medium">Адрес доставки</h3>
      <div className="mt-5">
        <label className="block text-gray-700 mb-2">Страна</label>
        <input
          type="text"
          name="country"
          value={userData.country}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-3 border border-gray-300 rounded-lg bg-purple-100 mb-5"
          disabled={!isEditing} // Если не в режиме редактирования, то поле заблокировано
        />
        <label className="block text-gray-700 mb-2">Город</label>
        <input
          type="text"
          name="city"
          value={userData.city}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-3 border border-gray-300 rounded-lg bg-purple-100"
          disabled={!isEditing} // Если не в режиме редактирования, то поле заблокировано
        />
      </div>
      {isEditing && (
        <Button
          onClick={handleSaveClick}
          className="mt-4 w-full py-2 text-white rounded-lg"
        >
          Сохранить
        </Button>
      )}
    </div>
  );
};

export default Profile;
