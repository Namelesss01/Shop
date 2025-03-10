import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Basket from "./pages/busket/Basket";
import Footer from "./shared/footer/Footer";
import More from "./pages/more/More";
import Favorites from "./pages/favorites/Favorites";
import Profile from "./pages/profile/Profile";
import Oferta from "./shared/oferta/Oferta";
import AddFile from "./shared/add_product/AddFile";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/more" element={<More />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/oferta" element={<Oferta />} />
        <Route path="/addfile" element={<AddFile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
