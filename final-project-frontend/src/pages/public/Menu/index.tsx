import axios from "axios";
import MenuDisplayOption from "components/page-components/MenuComponent/MenuDisplayOption";
import MenuList from "components/page-components/MenuComponent/MenuList";
import SearchBar from "components/page-components/MenuComponent/SearchBar";
import Navbar from "components/shared-components/Navbar";
import { ICategory } from "interfaces/Category";
import { IMenu } from "interfaces/Menu";
import React, { useEffect, useState } from "react";
import MenuWrapper from "./style";

const Menu = () => {
  const handleFilterChange = (e: React.FormEvent<HTMLInputElement>) => {};

  const handleOrderChange = (e: React.FormEvent<HTMLInputElement>) => {};

  const handleSortChange = (e: React.FormEvent<HTMLInputElement>) => {};

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [menu, setMenu] = useState<IMenu[]>([]);

  const fetchCategories = () => {
    axios
      .get("http://localhost:8080/categories")
      .then((data) => setCategories(data.data.data));
  };

  const fetchMenus = () => {
    axios
      .get("http://localhost:8080/menus")
      .then((data) => setMenu(data.data.data));
  };

  useEffect(() => {
    fetchCategories();
    fetchMenus();
  }, []);

  return (
    <MenuWrapper>
      <Navbar />
      <SearchBar />
      <MenuDisplayOption
        handleFilterChange={handleFilterChange}
        handleOrderChange={handleOrderChange}
        handleSortChange={handleSortChange}
        categories={categories}
      />
      <MenuList menus={menu} />
    </MenuWrapper>
  );
};

export default Menu;
