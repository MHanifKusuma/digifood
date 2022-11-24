import axios from "axios";
import MenuDisplayOption from "components/page-components/MenuComponent/MenuDisplayOption";
import MenuList from "components/page-components/MenuComponent/MenuList";
import SearchBar from "components/page-components/MenuComponent/SearchBar";
import Button from "components/shared-components/Button";
import Navbar from "components/shared-components/Navbar";
import { ICategory } from "interfaces/Category";
import { IFilterOption } from "interfaces/FilterOption";
import { IMenu } from "interfaces/Menu";
import React, { useEffect, useState } from "react";
import MenuWrapper from "./style";

const Menu = () => {
  const handleFilterChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setFilterOption({
      ...filterOption,
      category: e.currentTarget.value,
      limit: 12,
    });
  };

  const handleOrderChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setFilterOption({
      ...filterOption,
      order: e.currentTarget.value,
    });
  };

  const handleSortChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setFilterOption({
      ...filterOption,
      sortBy: e.currentTarget.value,
    });
  };

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [menu, setMenu] = useState<IMenu[]>([]);
  const [filterOption, setFilterOption] = useState<IFilterOption>({
    limit: 12,
  });
  const [isLastPage, setIsLastPage] = useState(false);

  const fetchCategories = () => {
    axios
      .get("http://localhost:8080/categories")
      .then((data) => setCategories(data.data.data));
  };

  const fetchMenus = () => {
    axios
      .get(`http://localhost:8080/menus`, {
        params: filterOption,
      })
      .then((data) => {
        setMenu(data.data.data.data);
        setIsLastPage(data.data.data.current_page == data.data.data.total_page);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchMenus();
  }, [filterOption]);

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
      <MenuList
        menus={menu}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
        isLastPage={isLastPage}
      />
    </MenuWrapper>
  );
};

export default Menu;
