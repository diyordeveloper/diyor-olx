import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/home/Home";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Elon from "./components/elonadd/Elon";
import Profil from "./components/auth/profil/Profil";
import { Context } from "./Contexts/Context";
import { AuthContextUser } from "./Contexts/AuthContext";
// Css Files
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./assets/style/all.scss";
import "./assets/style/style.scss";
import AllCard from "./components/products/AllCard";
import Favorites from "./components/favorites/Favorites";
import AllProfil from "./components/auth/profil/AllProfil";
import NotFound404 from "./components/404/NotFound404";
function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <ToastContainer />
        <Context>
          <AuthContextUser>
            <Routes>
              <Route index element={<Home />} path="/" />
              <Route element={<Login />} path="/login" />
              <Route element={<Register />} path="/register" />
              <Route element={<Profil />} path="/profil" />
              <Route
                element={<AllProfil />}
                path="/profiluser/:name/:phone/:email"
              />
              <Route element={<AllCard />} path="/card/:category/:name/:ID" />
              <Route element={<Elon />} path="/elon" />
              <Route element={<Favorites />} path="/favorites" />
              <Route element={<NotFound404 />} path="*" />
            </Routes>
          </AuthContextUser>
        </Context>
      </BrowserRouter>
    </div>
  );
}

export default App;
