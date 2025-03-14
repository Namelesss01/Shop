import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import AdminAside from "../../shared/admin_aside/AdminAside";
import AdminHeader from "../../shared/admin_header/AdminHeader";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../../components/ui/pagination";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { auth, db } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import * as XLSX from "xlsx";

interface User {
  id?: string;
  displayName: string;
  email: string;
  role: string;
  country?: string;
  phone?: string;
  social?: string;
  startDate?: string;
  comment?: string;
  position?: string;
  rights?: string;
  date?: string;
  status?: string;
}

const People = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    login: "",
    password: "",
    confirmPassword: "",
    role: "admin",
    comment: "",
    position: "",
    rights: "",
    phone: "",
    date: new Date().toLocaleDateString(),
  });

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    country: "RU",
    order: "new",
    interactions: ["cart", "favorites"],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [admins, setAdmins] = useState<User[]>([]);

  const { documents: allData, error } = useCollection("users");
  const { addDocument, deleteDocument, updateDocument } = useFirestore("users");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const q = query(collection(db, "users"), where("role", "==", "admin"));
        const querySnapshot = await getDocs(q);
        const adminList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        setAdmins(adminList);
      } catch (error) {
        console.error("Ошибка загрузки админов:", error);
      }
    };

    fetchAdmins();
  }, [allData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.login,
        formData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        displayName: formData.displayName,
        email: formData.login,
        role: formData.role,
        comment: formData.comment,
        position: formData.position,
        rights: formData.rights,
        phone: formData.phone,
        date: formData.date,
        isActive: true,
      });

      alert("Пользователь добавлен!");
      setFormData({
        displayName: "",
        login: "",
        password: "",
        confirmPassword: "",
        role: "admin",
        comment: "",
        position: "",
        rights: "",
        phone: "",
        date: new Date().toLocaleDateString(),
      });
    } catch (error: any) {
      alert("Ошибка: " + error.message);
    }
  };

  const handleAddUser = async () => {
    try {
      const newUser = {
        name: "Новый пользователь",
        email: "newuser@example.com",
        location: "RU",
        phone: "+7 (123) 456-78-90",
        social: "Twitter",
        startDate: new Date().toLocaleDateString(),
      };

      await addDocument(newUser);
      alert("Пользователь успешно добавлен!");
    } catch (error) {
      console.error("Ошибка при добавлении пользователя:", error);
      alert("Ошибка при добавлении пользователя.");
    }
  };

  const exportToExcel = () => {
    const maxLength = 32767; // Максимальная длина текста для Excel
    const dataToExport = filteredData.map((user) => {
      return {
        ...user,
        comment: user.comment ? user.comment.substring(0, maxLength) : "", // Обрезаем комментарий
        // Добавьте другие поля, если они могут содержать длинный текст
      };
    });

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Пользователи");
    XLSX.writeFile(wb, "Пользователи.xlsx");
  };

  const toggleFilter = (category: string, value: string) => {
    setFilters((prev) => {
      if (Array.isArray(prev[category])) {
        return {
          ...prev,
          [category]: prev[category].includes(value)
            ? prev[category].filter((v) => v !== value)
            : [...prev[category], value],
        };
      }
      return { ...prev, [category]: prev[category] === value ? "" : value };
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = allData
    ? allData.filter(
        (user) =>
          user.role !== "admin" &&
          (user.displayName?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase()) ||
            user.phone?.toLowerCase().includes(search.toLowerCase()))
      )
    : [];
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  if (error) {
    return <div>Ошибка загрузки данных: {error}</div>;
  }

  if (allData === null) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex w-full">
        <div>
          <AdminAside />
          <div className="bg-white shadow-md p-6 max-w-[248px] rounded-2xl mt-4 ml-5">
            <h2 className="text-xl font-bold mb-4">Фильтр</h2>
            <div className="mb-4">
              <h3 className="font-medium">Страна</h3>
              {["RU", "KZ", "Other"].map((value, idx) => (
                <div key={idx} className="flex items-center my-2">
                  <input
                    type="checkbox"
                    checked={filters.country === value}
                    onChange={() => toggleFilter("country", value)}
                    className="mr-2"
                  />
                  {value}
                </div>
              ))}
            </div>
            <div className="mb-4">
              <h3 className="font-medium">Сначала</h3>
              {["new", "old", "inactive"].map((value, idx) => (
                <div key={idx} className="flex items-center my-2">
                  <input
                    type="checkbox"
                    checked={filters.order === value}
                    onChange={() => toggleFilter("order", value)}
                    className="mr-2"
                  />
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full p-6">
          <Tabs defaultValue="users" className="w-full max-w-4xl">
            <TabsList>
              <TabsTrigger value="users">Список пользователей</TabsTrigger>
              <TabsTrigger value="settings">Админы</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
              <div className="w-full bg-white shadow-md rounded-2xl p-6 mb-5">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">Данные</p>
                  <Button onClick={exportToExcel}>Export to Excel</Button>
                </div>

                <div className="mt-4 bg-blue-600 p-2">
                  <ul className="flex gap-14">
                    <li className="text-white text-xs font-bold ml-6">
                      Всего пользователей
                    </li>
                    <li className="text-white text-xs font-bold">Админы</li>
                    <li className="text-white text-xs font-bold">Неактивные</li>
                  </ul>
                </div>

                <div className="pb-4">
                  <ul className="flex gap-28 mt-4">
                    <li className="text-xs ml-[76px]">
                      {filteredData ? filteredData.length : 0}
                    </li>
                    <li className="text-xs ml-[25px]">
                      {allData
                        ? allData.filter((user) => user.role === "admin").length
                        : 0}
                    </li>
                    <li className="text-xs">
                      {allData
                        ? allData.filter((user) => user.status === "inactive")
                            .length
                        : 0}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="w-full bg-white shadow-md p-6 rounded-2xl">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-medium">
                    Найдено: {filteredData ? filteredData.length : 0}
                  </h2>
                  <input
                    type="text"
                    placeholder="Поиск"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border rounded"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="p-3 text-left">ФИО</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Страна и город</th>
                        <th className="p-3 text-left">Номер телефона</th>
                        <th className="p-3 text-left">Соц сети</th>
                        <th className="p-3 text-left">Дата старта</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((person, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                          }
                        >
                          <td className="p-3 border">{person.displayName}</td>
                          <td className="p-3 border">{person.email}</td>
                          <td className="p-3 border">{person.country}</td>
                          <td className="p-3 border">{person.phone}</td>
                          <td className="p-3 border">{person.social}</td>
                          <td className="p-3 border">{person.startDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {[
                      ...Array(Math.ceil(filteredData.length / itemsPerPage)),
                    ].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          onClick={() => setCurrentPage(i + 1)}
                          isActive={currentPage === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(
                              prev + 1,
                              Math.ceil(filteredData.length / itemsPerPage)
                            )
                          )
                        }
                        disabled={
                          currentPage ===
                          Math.ceil(filteredData.length / itemsPerPage)
                        }
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <select
                        value={itemsPerPage}
                        onChange={(e) =>
                          setItemsPerPage(Number(e.target.value))
                        }
                        className="p-2 border rounded"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={filteredData.length}>All</option>
                      </select>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </TabsContent>
            <TabsContent value="settings">
              <div className="flex">
                <div className="flex-1 p-6">
                  <h1 className="text-2xl font-bold mb-4 text-blue-600">
                    Действующие администраторы
                  </h1>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead>
                        <tr className="bg-blue-50">
                          <th className="py-3 px-4 border-b text-left text-blue-600">
                            ФИО
                          </th>
                          <th className="py-3 px-4 border-b text-left text-blue-600">
                            Права
                          </th>
                          <th className="py-3 px-4 border-b text-left text-blue-600">
                            Должность
                          </th>
                          <th className="py-3 px-4 border-b text-left text-blue-600">
                            Номер телефона
                          </th>
                          <th className="py-3 px-4 border-b text-left text-blue-600">
                            Статус
                          </th>
                          <th className="py-3 px-4 border-b text-left text-blue-600">
                            Дата
                          </th>
                          <th className="py-3 px-4 border-b text-left text-blue-600">
                            ID
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {admins.map((admin) => (
                          <tr key={admin.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 border-b">
                              {admin.displayName}
                            </td>
                            <td className="py-3 px-4 border-b">
                              {admin.rights || "—"}
                            </td>
                            <td className="py-3 px-4 border-b">
                              {admin.position || "—"}
                            </td>
                            <td className="py-3 px-4 border-b">
                              {admin.phone || "—"}
                            </td>
                            <td className="py-3 px-4 border-b">
                              {admin.status || "Активен"}
                            </td>
                            <td className="py-3 px-4 border-b">
                              {admin.date || "—"}
                            </td>
                            <td className="py-3 px-4 border-b">{admin.id}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <h2 className="text-xl font-bold mt-6 mb-4 text-blue-600">
                    Добавить админа
                  </h2>
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm"
                  >
                    <div className="flex">
                      <div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2 text-blue-600">
                            Введите ФИО
                          </label>
                          <input
                            type="text"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            placeholder="Введите..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2 text-blue-600">
                            Логин (Email)
                          </label>
                          <input
                            type="email"
                            name="login"
                            value={formData.login}
                            onChange={handleChange}
                            placeholder="Введите..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2 text-blue-600">
                            Пароль
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Введите..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2 text-blue-600">
                            Подтвердите пароль
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Придумайте надежный пароль"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2 text-blue-600">
                            Должность
                          </label>
                          <input
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            placeholder="Введите должность"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2 text-blue-600">
                            Права
                          </label>
                          <input
                            type="text"
                            name="rights"
                            value={formData.rights}
                            onChange={handleChange}
                            placeholder="Введите права"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2 text-blue-600">
                            Номер телефона
                          </label>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Введите номер телефона"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2 text-blue-600">
                            Дата регистрации
                          </label>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2 text-blue-600">
                            Комментарий
                          </label>
                          <textarea
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            placeholder="Комментарий"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          ></textarea>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            Отмена
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            Добавить
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default People;
