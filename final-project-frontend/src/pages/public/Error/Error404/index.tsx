import AdminNavbar from "components/shared-components/AdminNavbar";
import Button from "components/shared-components/Button";
import Navbar from "components/shared-components/Navbar";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/reducers";
import Error404Wrapper from "./style";

const Error404 = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.UsersReducer);

  return (
    <>
      {user.Role != 0 ? <Navbar /> : <AdminNavbar />}
      <Error404Wrapper className="py-5">
        <div>
          <h1>Error 404</h1>
          <h3>Sorry, the page you're lookin for is not found</h3>
          <Button
            btnStyle={{
              backgroundColor: "#579EFF",
              color: "#FFFFFF",
              padding: "0.5rem 1rem",
            }}
            btnClass="mt-5"
            btnFunction={() => navigate("/")}
          >
            Home Page
          </Button>
        </div>
      </Error404Wrapper>
    </>
  );
};

export default Error404;
