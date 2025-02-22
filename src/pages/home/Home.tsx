import React, { useState } from "react";
import post from "../../assets/img/group7.jpg";
import Product from "../../shared/product/Product";
import Footer from "../../shared/footer/Footer";
import { Auth } from "../../shared/authorization/Auth";
 
const Home = () => {
  const [selectedCategory] = useState<string>("Все");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Основной контент */}
      <div>
        <img src={post} alt="" className="w-full" />
        <div className="mx-4">
           <Header></Header>
          <Product selectedCategory={selectedCategory} />{" "}
          {/* Передаем категорию */}
        </div>
      </div>

      {/* Закрепленный Footer */}
      <Footer />
    </div>
  );
};

export default Home;
