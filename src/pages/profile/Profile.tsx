import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import Ava from "../../assets/img/avatar.png";
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
    avatar: Ava,
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
            avatar: data?.avatar || Ava,
          });
        } else {
          // Если пользователя нет, создаём новый документ
          await setDoc(doc(db, "users", user.uid), userData);
          setUserData({ ...userData, avatar: Ava });
        }
        setLoading(false);
      } else {
        setLoading(false);
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
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        // Если документ существует, обновляем его
        await updateDoc(userDocRef, userData);
      } else {
        // Если документа нет, создаём новый
        await setDoc(userDocRef, userData);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (userId) {
      const userDocRef = doc(db, "users", userId);
      // Используем setDoc с merge: true для обновления данных пользователя
      await setDoc(userDocRef, userData, { merge: true });
      setIsEditing(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) return; // Если редактирование запрещено, ничего не делать
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        const newAvatar = reader.result as string;
        setUserData((prev) => ({ ...prev, avatar: newAvatar }));
        if (userId) {
          const userDocRef = doc(db, "users", userId);
          await updateDoc(userDocRef, { avatar: newAvatar });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl mb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Ваш профиль</h2>
        <button
          className="text-gray-500 hover:text-gray-800"
          onClick={handleBackClick}
        >
          <X size={24} />
        </button>
      </div>
      <span>Аватарка</span>
      <div className="flex flex-col items-left mb-6">
        <div className="relative border-8 border-white rounded-full shadow-md w-24 h-24">
          <img
            src={userData.avatar}
            alt="Аватарка"
            className="w-full h-full rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="avatarInput"
            onChange={handleAvatarChange}
          />
          <label
            htmlFor="avatarInput"
            className={`absolute top-0 left-16 bg-purple-500 text-white p-1 rounded-full shadow-md cursor-pointer ${
              !isEditing ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <Pencil size={16} />
          </label>
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
          disabled={!isEditing}
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Электронная почта"
          className="w-full p-3 border border-gray-300 rounded-lg bg-purple-100"
          disabled={!isEditing}
        />
        <input
          type="tel"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Телефон"
          className="w-full p-3 border border-gray-300 rounded-lg bg-purple-100"
          disabled={!isEditing}
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Пароль"
          className="w-full p-3 border border-gray-300 rounded-lg bg-purple-100"
          disabled={!isEditing}
        />
        <input
          type="text"
          name="country"
          value={userData.country}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Страна"
          className="w-full p-3 border border-gray-300 rounded-lg bg-purple-100"
          disabled={!isEditing}
        />
        <input
          type="text"
          name="city"
          value={userData.city}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Город"
          className="w-full p-3 border border-gray-300 rounded-lg bg-purple-100"
          disabled={!isEditing}
        />
      </div>
      <div className="flex justify-between items-center mt-6">
        {isEditing ? (
          <Button onClick={handleSaveClick}>Сохранить</Button>
        ) : (
          <Button onClick={handleEditClick}>Редактировать</Button>
        )}
      </div>
    </div>
  );
};

export default Profile;
