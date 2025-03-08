import React, { useState, useEffect } from "react";
import post from "../../assets/img/group7.jpg";
import { Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import Product from "../../shared/product/Product";
import Footer from "../../shared/footer/Footer";
import { Auth } from "../../shared/authorization/Auth";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Функция обработки ввода текста в поле поиска
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Обновляем состояние поиска
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Основной контент */}
      <div>
        <img src={post} alt="" className="w-full" />
        <div className="mx-4">
          <div className="mt-4 flex justify-center items-center relative">
            <Search className="absolute left-4 md:left-7 w-5 h-5 text-gray-200" />
            <Input
              placeholder="Поиск товаров"
              className="w-full rounded-3xl pl-10 md:pl-20" // изменим отступ в зависимости от разрешения
              value={searchQuery} // Значение для поля поиска
              onChange={handleSearch} // Функция для обновления searchQuery
            />
          </div>
          <Product selectedCategory={selectedCategory} searchQuery={searchQuery} /> {/* Передаем searchQuery */}
        </div>
      </div>
      <div className="mt-20"></div>
      {/* Закрепленный Footer */}
      <Footer />
    </div>
  );
};

export default Home;
