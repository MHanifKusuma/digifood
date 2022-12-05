import axios from "axios";
import SearchBar from "components/page-components/MenuComponent/SearchBar";
import OrderList from "components/page-components/OrderComponent/OrderList";
import OrderListDisplayOption from "components/page-components/OrderComponent/OrderListDisplayOption";
import Navbar from "components/shared-components/Navbar";
import { ICategory } from "interfaces/Category";
import { IFilterOption } from "interfaces/FilterOption";
import { SearchInput } from "interfaces/FormInput";
import { IOrder, IOrderPagination } from "interfaces/Order";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler } from "react-hook-form";
import OrderWrapper from "./style";

const Order = () => {
  const [cookies] = useCookies(["login"]);
  const handleFilterChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setFilterOption({
      ...filterOption,
      category: e.currentTarget.value,
      limit: 10,
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

  const onSearchSubmit: SubmitHandler<SearchInput> = (data) => {
    setFilterOption({
      ...filterOption,
      name: data.name,
    });
  };

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [orders, setOrders] = useState<IOrderPagination>({
    current_page: 0,
    data: [],
    total: 0,
    total_page: 0,
  });
  const [filterOption, setFilterOption] = useState<IFilterOption>({
    limit: 10,
  });
  const [isLastPage, setIsLastPage] = useState(false);

  const fetchCategories = () => {
    axios
      .get("http://localhost:8080/categories")
      .then((data) => setCategories(data.data.data));
  };

  const fetchUserOrders = () => {
    axios
      .get("http://localhost:8080/orders", {
        params: filterOption,
        headers: {
          Authorization: `Bearer ${cookies.login}`,
        },
      })
      .then((data) => setOrders(data.data.data));
  };

  useEffect(() => {
    fetchUserOrders();
    fetchCategories();
  }, [filterOption]);

  return (
    <OrderWrapper>
      <Navbar />
      <SearchBar onSubmit={onSearchSubmit} />
      <div className="container py-5">
        <h1>Order History</h1>
        <OrderListDisplayOption
          categories={categories}
          handleFilterChange={handleFilterChange}
          handleOrderChange={handleOrderChange}
          handleSortChange={handleSortChange}
        />
        <OrderList
          orders={orders}
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          isLastPage={isLastPage}
        />
      </div>
    </OrderWrapper>
  );
};

export default Order;
