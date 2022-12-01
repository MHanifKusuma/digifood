import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { Route, Routes } from "react-router-dom";
import PublicRoutes from "pages/public";
import Login from "pages/public/Authentication/Login";
import Register from "pages/public/Authentication/Register";
import Home from "pages/public/Home";
import Menu from "pages/public/Menu";
import MenuDetail from "pages/public/MenuDetail";
import ProtectedRoutes from "pages/protected";
import Cart from "pages/protected/Cart";
import Order from "pages/protected/Order";
import OrderDetail from "pages/protected/OrderDetail";
import Profile from "pages/protected/Profile";
import { UserDispatch } from "redux/actions/UserAction/type";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { fetchUser } from "redux/actions/UserAction";
import Promo from "pages/public/Promo";

function App() {
  const userDispatch: UserDispatch = useDispatch();
  const [cookies] = useCookies(["login"]);
  const setUserProfile = () => {
    userDispatch(fetchUser(cookies.login));
  };

  useEffect(() => {
    setUserProfile();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menus" element={<Menu />} />
        <Route path="/menus/:id/:name" element={<MenuDetail />} />

        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/promos" element={<Promo />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/carts" element={<Cart />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
