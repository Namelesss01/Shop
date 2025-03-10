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
import AdminHeader from "./shared/admin_header/AdminHeader";
import Dashboard from "./admin_pages/dashboard/Dashboard";
import AdminAside from "./shared/admin_aside/AdminAside";
import Peaple from "./admin_pages/people/Peaple";
import Ordest from "./admin_pages/orderst/Ordest";
import BuyList from "./admin_pages/buy_list/BuyList";
import Bots from "./admin_pages/bots/Bots";

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
        <Route path="/admin_header" element={<AdminHeader />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="/admin_aside" element={<AdminAside />} />
        <Route path="/peaple" element={<Peaple />} />
        <Route path="orderst" element={<Ordest />} />
        <Route path="/buy_list" element={<BuyList />} />
        <Route path="/bots" element={<Bots />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
