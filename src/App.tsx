import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Basket from "./pages/busket/Basket";
import Footer from "./shared/footer/Footer";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;