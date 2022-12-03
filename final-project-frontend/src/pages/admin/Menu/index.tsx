import axios from "axios";
import MenuDisplayOption from "components/page-components/MenuComponent/MenuDisplayOption";
import MenuList from "components/page-components/MenuComponent/MenuList";
import SearchBar from "components/page-components/MenuComponent/SearchBar";
import AdminNavbar from "components/shared-components/AdminNavbar";
import { ICategory } from "interfaces/Category";
import { IFilterOption } from "interfaces/FilterOption";
import { SearchInput } from "interfaces/FormInput";
import { IMenuPagination } from "interfaces/Menu";
import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import AdminMenuWrapper from "./style";

const AdminMenu = () => {
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
  const [menu, setMenu] = useState<IMenuPagination>({
    current_page: 0,
    data: [],
    total: 0,
    total_page: 0,
  });
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
        setMenu(data.data.data);
        setIsLastPage(data.data.data.current_page == data.data.data.total_page);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchMenus();
  }, [filterOption]);

  const onSubmit: SubmitHandler<SearchInput> = (data) => {
    axios
      .get(`http://localhost:8080/menus?name=${data.name}&limit=12`)
      .then((data) => data.data.data)
      .then((menu) => {
        if (menu.data[0]) {
          setMenu(menu);
        } else {
          setMenu({
            current_page: 0,
            data: [],
            total: 0,
            total_page: 0,
          });
        }
      });
  };
  return (
    <AdminMenuWrapper>
      <AdminNavbar />
      <SearchBar
        onSubmit={onSubmit}
        customStyle={{ backgroundColor: "#292b36" }}
      />
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
    </AdminMenuWrapper>
  );
};

export default AdminMenu;
