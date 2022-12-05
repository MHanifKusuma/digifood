import axios from "axios";
import AdminMenuInfo, {
  MenuInfoComponentType,
} from "components/page-components/AdminMenuDetailComponent/MenuInfo";
import AdminMenuDetailPhoto from "components/page-components/AdminMenuDetailComponent/MenuPhoto";
import AdminNavbar from "components/shared-components/AdminNavbar";
import { ICategory } from "interfaces/Category";
import { IMenu } from "interfaces/Menu";
import React, { useEffect, useState } from "react";
import AdminNewMenuWrapper from "./style";

const AdminNewMenu = () => {
  const menu: IMenu = {
    Id: 0,
    Name: "",
    CategoryId: 0,
    Description: "",
    AverageRating: 0,
    TotalFavorites: 0,
    TotalReview: 0,
    Price: 0,
    MenuPhoto: "",
    MenuOptions: [],
    Promotion: {
      Id: 0,
      Name: "",
      Discount: 0,
      Available: false,
    },
  };

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [fetchError, setFetchError] = useState("");

  const fetchCategories = () => {
    axios
      .get(`http://localhost:8080/categories`)
      .then((data) => setCategories(data.data.data))
      .catch((err) => setFetchError(err.response.statusText));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <AdminNavbar />
      <AdminNewMenuWrapper className="container py-5">
        <div className="col-12 col-lg-6 p-3">
          <AdminMenuInfo
            menu={menu}
            categories={categories}
            type={MenuInfoComponentType.CREATE}
          />
        </div>
        <div className="col-12 col-lg-6 p-3">
          <AdminMenuDetailPhoto img={menu.MenuPhoto} />
        </div>
      </AdminNewMenuWrapper>
    </>
  );
};

export default AdminNewMenu;
