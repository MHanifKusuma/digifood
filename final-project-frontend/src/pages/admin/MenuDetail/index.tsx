import axios from "axios";
import AdminMenuInfo, {
  MenuInfoComponentType,
} from "components/page-components/AdminMenuDetailComponent/MenuInfo";
import AdminMenuDetailPhoto from "components/page-components/AdminMenuDetailComponent/MenuPhoto";
import AdminNavbar from "components/shared-components/AdminNavbar";
import { ICartItem } from "interfaces/Cart";
import { ICategory } from "interfaces/Category";
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
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [fetchError, setFetchError] = useState("");

  const fetchMenu = () => {
    axios
      .get(`http://localhost:8080/menus/${id}`)
      .then((data) => setMenu(data.data.data))
      .catch((err) => setFetchError(err.response.statusText));
  };

  const fetchCategories = () => {
    axios
      .get(`http://localhost:8080/categories`)
      .then((data) => setCategories(data.data.data))
      .catch((err) => setFetchError(err.response.statusText));
  };

  useEffect(() => {
    fetchMenu();
    fetchCategories();
  }, []);

  const { data } = useSelector((state: RootState) => state.OrdersReducer);
  return (
    <>
      <AdminNavbar />
      <AdminMenuDetailWrapper className="container py-5">
        <div className="col-12 col-lg-6 p-3">
          <AdminMenuInfo
            menu={menu}
            categories={categories}
            type={MenuInfoComponentType.UPDATE}
          />
        </div>
        <div className="col-12 col-lg-6 p-3">
          <AdminMenuDetailPhoto img={menu.MenuPhoto} />
        </div>
      </AdminMenuDetailWrapper>
    </>
  );
};

export default AdminMenuDetail;
