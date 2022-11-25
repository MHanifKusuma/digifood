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

const Navbar = () => {
  const currPath = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["login"]);
  const cartDispatch: CartDispatch = useDispatch();

  return (
    <NavbarWrapper className="navbar navbar-expand-lg">
      <div className="container">
        <NavbarLogo className="d-flex align-items-center">
          <Link to={"/"} className="navbar-brand d-flex align-items-center">
            <img src={Logo} alt="" className="me-1" />
            <h5>DigiFood</h5>
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
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
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
                to={"/orders"}
                className={`nav-link ${
                  currPath.pathname === "/orders" ? "active" : ""
                }`}
              >
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/games"}
                className={`nav-link ${
                  currPath.pathname === "/games" ? "active" : ""
                }`}
              >
                Games
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/promos"}
                className={`nav-link ${
                  currPath.pathname === "/promos" ? "active" : ""
                }`}
              >
                Promos
              </Link>
            </li>
          </ul>
          <CartIcon height="25" fill="#000" className="me-3" />
          <div
            className="dropdown d-inline"
            role="button"
            data-bs-toggle="dropdown"
          >
            <UserIcon height="25" fill="#000" className="me-1" />
            <TriangleIcon
              height="15"
              fill="#000000"
              style={{ transform: "rotate(180deg)" }}
            />
            <ul className="dropdown-menu dropdown-menu-start dropdown-menu-lg-end">
              {cookies.login ? (
                <>
                  <li className="nav-item">
                    <Link
                      to={"/profile"}
                      onClick={() => navigate("/profile")}
                      className="dropdown-item p-2"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/coupons"}
                      onClick={() => navigate("/coupon")}
                      className="dropdown-item p-2"
                    >
                      Coupons
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/login"}
                      onClick={() => {
                        removeCookie("login");
                        cartDispatch(resetCarts());
                        navigate("/login");
                      }}
                      className="dropdown-item p-2"
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    to={"/login"}
                    onClick={() => navigate("/login")}
                    className="dropdown-item p-2"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </NavigationLink>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
