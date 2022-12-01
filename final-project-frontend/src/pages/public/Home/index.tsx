import Navbar from "components/shared-components/Navbar";
import React, { useEffect, useState } from "react";
import HomeWrapper from "./style";
import Hero from "components/page-components/HomeComponent/Hero";
import OurMenu from "components/page-components/HomeComponent/OurMenu";
import { IMenuByCategory } from "interfaces/Menu";
import axios, { AxiosResponse } from "axios";
import { UserDispatch } from "redux/actions/UserAction/type";
import { useDispatch } from "react-redux";
import { fetchUser } from "redux/actions/UserAction";
import { useCookies } from "react-cookie";

const Home = () => {
  const [categories, setCategories] = useState<IMenuByCategory[]>([]);
  // const userDispatch: UserDispatch = useDispatch();
  // const [cookies] = useCookies(["login"]);

  const FetchMenuByCategory = () => {
    axios
      .get("http://localhost:8080/menus/categories")
      .then((data) => setCategories(data.data.data));
  };

  // const setUserProfile = () => {
  //   userDispatch(fetchUser(cookies.login));
  // };

  useEffect(() => {
    FetchMenuByCategory();
    // setUserProfile();
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
