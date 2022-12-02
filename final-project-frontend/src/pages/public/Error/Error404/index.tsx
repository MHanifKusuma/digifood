import Button from "components/shared-components/Button";
import Navbar from "components/shared-components/Navbar";
import React from "react";
import { useNavigate } from "react-router-dom";
import Error404Wrapper from "./style";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
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
