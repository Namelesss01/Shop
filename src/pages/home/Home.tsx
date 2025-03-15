import React, { useState, useEffect } from "react";
import post from "../../assets/img/group7.jpg";
import Product from "../../shared/product/Product";
import Footer from "../../shared/footer/Footer";
import { Search } from "lucide-react";
import { Auth } from "../../shared/authorization/Auth";
import { Input } from "../../components/ui/input";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
              className="w-full rounded-3xl pl-10 md:pl-20"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Product
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
          />{" "} {/* Передаем searchQuery */}
        </div>
      </div>
      <div className="mt-20"></div>
      <Footer />
    </div>
  );
};

export default Home;
