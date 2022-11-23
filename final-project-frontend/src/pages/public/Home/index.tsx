import Navbar from "components/Navbar";
import React from "react";
import HomeWrapper from "./style";
import Logo from "assets/logo.webp";
import Hero from "components/HomeComponent/Hero";

const Home = () => {
  return (
    <>
      <Navbar />
      <HomeWrapper>
        <Hero />
      </HomeWrapper>
    </>
  );
};

export default Home;
