import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticationRoutes = () => {
  const [cookies] = useCookies(["login"]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    cookies["login"] === undefined ? false : true
  );

  useEffect(() => {
    setIsLoggedIn(cookies["login"] === undefined ? false : true);
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  } else {
    return <Outlet />;
  }
};

export default AuthenticationRoutes;
