import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const PublicRoutes = () => {
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

export default PublicRoutes;
