import axios from "axios";
import MenuDisplayOption from "components/page-components/MenuComponent/MenuDisplayOption";
import MenuList from "components/page-components/MenuComponent/MenuList";
import Navbar from "components/shared-components/Navbar";
import { ICategory } from "interfaces/Category";
import { IFilterOption } from "interfaces/FilterOption";
import { IMenu, IMenuPagination } from "interfaces/Menu";
import React, { useEffect, useState } from "react";
import PromoWrapper from "./style";

const Promo = () => {
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
      .get(`http://localhost:8080/menus?limit=100`, {
        params: filterOption,
      })
      .then((data) => {
        let menus: IMenuPagination = data.data.data;
        menus.data = menus.data.filter((menu) => menu.Promotion.Id);
        setMenu(menus);
        setIsLastPage(data.data.data.current_page == data.data.data.total_page);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchMenus();
  }, [filterOption]);
  return (
    <PromoWrapper>
      <Navbar />
      <div className="py-5">
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
      </div>
    </PromoWrapper>
  );
};

export default Promo;
