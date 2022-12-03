import axios from "axios";
import AdminMenuInfo from "components/page-components/AdminMenuDetailComponent/MenuInfo";
import AdminNavbar from "components/shared-components/AdminNavbar";
import { IMenu } from "interfaces/Menu";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "redux/reducers";
import AdminMenuDetailWrapper from "./style";

const AdminMenuDetail = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState<IMenu>({
    Id: 0,
    Name: "",
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

  const { data } = useSelector((state: RootState) => state.OrdersReducer);
  return (
    <AdminMenuDetailWrapper>
      <AdminNavbar />
      <div className="container py-5">
        <AdminMenuInfo menu={menu} />
      </div>
    </AdminMenuDetailWrapper>
  );
};

export default AdminMenuDetail;
