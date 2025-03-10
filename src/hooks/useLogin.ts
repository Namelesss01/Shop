import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore"; // Добавлен getDoc для получения данных пользователя
import { useDispatch } from "react-redux";
import { setUser } from "@/features/user/userSlice";

export const useLogin = () => {
  const [error, setError] = useState<string>("");
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

  const login = async (email: string, password: string) => {
    setError("");
    setIsPending(true);

    try {
      // Авторизация пользователя
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (!response) {
        setError("Не получилось войти в систему");
        return null;
      }

      // Получаем данные пользователя из Firestore
      const userDoc = await getDoc(doc(db, "users", response.user.uid));

      if (!userDoc.exists()) {
        setError("Данные пользователя не найдены");
        return null;
      }

      const userData = userDoc.data();

      // Добавляем роль пользователя в объект пользователя
      const userWithRole = {
        ...response.user,
        role: userData.role || "user", // По умолчанию роль 'user', если она не указана
      };

      // Обновляем Redux-стор с данными пользователя, включая роль
      dispatch(setUser(userWithRole));

      return userWithRole; // Возвращаем пользователя с ролью
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsPending(false);
    }
  };

  return { error, isPending, login };
};
