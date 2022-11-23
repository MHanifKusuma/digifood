import React from "react";
import Logo from "assets/logo.webp";
import HeroWrapper from "./style";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import Button from "components/Button";
import { Link } from "react-router-dom";

const Hero = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed("#typed", {
      strings: ["Burgers?", "Ice Cream?", "Soda?", "Fried Rice?", "Fettucine?"],
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 300,
      loop: true,
    });

    // Destropying
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <HeroWrapper>
      <div className="container">
        <div className="d-flex my-auto">
          <div className="col-12 col-lg-6 my-auto">
            <h3>
              Craving for some <span id="typed" ref={el}></span>{" "}
            </h3>
            <h3>We got it covered!</h3>
            <Link to={"/menu"}>
              <Button
                btnStyle={{
                  padding: " 0.5rem 2rem",
                  borderRadius: "0",
                  backgroundColor: "#AAD4B3",
                  color: "#FFFFFF",
                }}
                btnClass="mt-3"
              >
                See all menus
              </Button>
            </Link>
          </div>
          <div className="col-6 d-none d-lg-block text-center">
            <img src={Logo} alt="" style={{ width: "75%" }} />
            <h1>DigiFood</h1>
          </div>
        </div>
      </div>
    </HeroWrapper>
  );
};

export default Hero;
