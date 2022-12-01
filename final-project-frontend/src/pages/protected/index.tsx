import Button from "components/shared-components/Button";
import ErrorModal from "components/shared-components/ErrorModal";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { RootState } from "redux/reducers";

const ProtectedRoutes = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["login"]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    cookies["login"] === undefined ? false : true
  );

  useEffect(() => {
    setIsLoggedIn(cookies["login"] === undefined ? false : true);
  }, [isLoggedIn]);

  const navigate = useNavigate();
  const { userError } = useSelector((state: RootState) => state.UsersReducer);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    if (userError) {
      setShowErrorModal(true);
      removeCookie("login");
    } else {
      setShowErrorModal(false);
    }
  }, [userError]);

  return (
    <>
      {userError && (
        <ErrorModal
          show={showErrorModal}
          handleClose={() => setShowErrorModal(false)}
          message={userError}
          button={
            <Button
              btnStyle={{
                backgroundColor: "#579EFF",
                color: "#FFFFFF",
                padding: "0.5rem 1rem",
              }}
              btnFunction={() => {
                navigate("/login");
                setShowErrorModal(false);
              }}
            >
              Login
            </Button>
          }
        />
      )}
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
