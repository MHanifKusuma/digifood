import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavbarWrapper, { NavbarLogo, NavigationLink } from "./style";
import Logo from "assets/logo.webp";
import CartIcon from "assets/CartIcon";
import UserIcon from "assets/UserIcon";
import TriangleIcon from "assets/TriangleIcon";
import { useCookies } from "react-cookie";
import { CartDispatch } from "redux/actions/CartAction/types";
import { useDispatch } from "react-redux";
import { resetCarts } from "redux/actions/CartAction";
import { UserDispatch } from "redux/actions/UserAction/type";
import { ResetUser } from "redux/actions/UserAction";

const AdminNavbar = () => {
  const currPath = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["login"]);
  const cartDispatch: CartDispatch = useDispatch();
  const userDispatch: UserDispatch = useDispatch();

  return (
    <NavbarWrapper className="navbar navbar-expand-lg">
      <div className="container">
        <NavbarLogo className="d-flex align-items-center">
          <Link to={"/"} className="navbar-brand d-flex align-items-center">
            <img src={Logo} alt="" className="me-1" />
            <h5>DigiFood Admin</h5>
          </Link>
        </NavbarLogo>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapsed"
          aria-controls="navbarCollapsed"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavigationLink
          className="collapse navbar-collapse pt-3 pt-lg-0"
          id="navbarCollapsed"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to={"/menus"}
                className={`nav-link ${
                  currPath.pathname === "/menus" ? "active" : ""
                }`}
              >
                Menus
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/coupons"}
                className={`nav-link ${
                  currPath.pathname === "/coupons" ? "active" : ""
                }`}
              >
                Coupons
              </Link>
            </li>
            {cookies.login ? (
              <li className="nav-item">
                <Link
                  to={"/login"}
                  onClick={() => {
                    removeCookie("login");
                    cartDispatch(resetCarts());
                    userDispatch(ResetUser());
                    navigate("/login");
                  }}
                  className={`nav-link ${
                    currPath.pathname === "/promos" ? "active" : ""
                  }`}
                >
                  Logout
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to={"/login"}
                  onClick={() => navigate("/login")}
                  className={`nav-link ${
                    currPath.pathname === "/promos" ? "active" : ""
                  }`}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </NavigationLink>
      </div>
    </NavbarWrapper>
  );
};

export default AdminNavbar;
