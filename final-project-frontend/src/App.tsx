import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { Route, Routes } from "react-router-dom";
import Home from "pages/public/Home";
import Menu from "pages/public/Menu";
import MenuDetail from "pages/public/MenuDetail";
import ProtectedRoutes from "pages/protected";
import Cart from "pages/protected/Cart";
import Order from "pages/protected/Order";
import OrderDetail from "pages/protected/OrderDetail";
import Profile from "pages/protected/Profile";
import { UserDispatch } from "redux/actions/UserAction/type";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { fetchUser } from "redux/actions/UserAction";
import Promo from "pages/public/Promo";
import Error404 from "pages/public/Error/Error404";
import Game from "pages/protected/Game";
import AuthenticationRoutes from "pages/authentication";
import Login from "pages/authentication/Login";
import Register from "pages/authentication/Register";
import { RootState } from "redux/reducers";
import Dashboard from "pages/admin/Dashboard";
import AdminRoutes from "pages/admin";
import AdminOrderDetail from "pages/admin/OrderDetail";
import AdminMenu from "pages/admin/Menu";
import AdminMenuDetail from "pages/admin/MenuDetail";
import AdminNewMenu from "pages/admin/NewMenu";
import AdminCoupon from "pages/admin/Coupon";

function App() {
  const userDispatch: UserDispatch = useDispatch();
  const [cookies] = useCookies(["login"]);
  const setUserProfile = () => {
    userDispatch(fetchUser(cookies.login));
  };

  const { user } = useSelector((state: RootState) => state.UsersReducer);
  useEffect(() => {
    setUserProfile();
  }, []);

  return (
    <div className="App">
      {user.Role != 0 ? (
        <Routes>
          <Route element={<AuthenticationRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/menus" element={<Menu />} />
          <Route path="/menus/:id/:name" element={<MenuDetail />} />
          <Route path="/promos" element={<Promo />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/carts" element={<Cart />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/games" element={<Game />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      ) : (
        <Routes>
          <Route element={<AuthenticationRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<AdminRoutes />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders/:id" element={<AdminOrderDetail />} />
            <Route path="/menus" element={<AdminMenu />} />
            <Route path="/menus/:id/:name" element={<AdminMenuDetail />} />
            <Route path="/menus/new" element={<AdminNewMenu />} />
            <Route path="/coupons" element={<AdminCoupon />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
