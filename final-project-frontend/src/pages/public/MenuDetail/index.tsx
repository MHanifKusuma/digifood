import axios from "axios";
import MenuInfo from "components/page-components/MenuDetailComponent/MenuInfo";
import MenuDetailPhoto from "components/page-components/MenuDetailComponent/MenuPhoto";
import Navbar from "components/shared-components/Navbar";
import { IMenu } from "interfaces/Menu";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuDetailWrapper from "./style";

const MenuDetail = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState<IMenu>({
    Id: 0,
    Name: "",
    CategoryId: 0,
    Description: "",
    Price: 0,
    AverageRating: 0,
    TotalReview: 0,
    TotalFavorites: 0,
    MenuPhoto: "",
    MenuOptions: [],
    Promotion: {
      Id: 0,
      Name: "",
      Discount: 0,
      Available: false,
    },
  });
  const [fetchError, setFetchError] = useState("");

  const fetchMenu = () => {
    axios
      .get(`http://localhost:8080/menus/${id}`)
      .then((data) => setMenu(data.data.data))
      .catch((err) => setFetchError(err.response.statusText));
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  if (fetchError) {
    return (
      <>
        <Navbar />
        <MenuDetailWrapper className="container py-5 justify-content-center">
          <h5 className="text-center">
            Sorry, we currently don't have what you're looking for
          </h5>
        </MenuDetailWrapper>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <MenuDetailWrapper className="container">
        <div className="col-12 col-lg-6">
          <MenuDetailPhoto photo={menu.MenuPhoto} />
        </div>
        <div className="col-12 col-lg-6">
          <MenuInfo menu={menu} />
        </div>
      </MenuDetailWrapper>
    </>
  );
};

export default MenuDetail;
