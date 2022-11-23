import Navbar from "components/Navbar";
import React, { useEffect, useState } from "react";
import HomeWrapper from "./style";
import Hero from "components/HomeComponent/Hero";
import OurMenu from "components/HomeComponent/OurMenu";
import { IMenuByCategory } from "interfaces/Menu";
import axios, { AxiosResponse } from "axios";

const Home = () => {
  const [categories, setCategories] = useState<IMenuByCategory[]>([]);

  const FetchMenuByCategory = () => {
    axios
      .get("http://localhost:8080/menus/categories")
      .then((data) => setCategories(data.data.data));
  };

  useEffect(() => {
    FetchMenuByCategory();
  }, []);
  return (
    <>
      <Navbar />
      <HomeWrapper>
        <Hero />
        <OurMenu categories={categories} />
      </HomeWrapper>
    </>
  );
};

export default Home;
