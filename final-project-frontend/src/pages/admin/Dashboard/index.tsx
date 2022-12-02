import axios from "axios";
import AdminNavbar from "components/shared-components/AdminNavbar";
import { IOrder, IOrderPagination } from "interfaces/Order";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import DashboardWrapper from "./style";
import OrderList from "components/page-components/AdminDashboardComponent/OrderList";
import { IFilterOption } from "interfaces/FilterOption";

const Dashboard = () => {
  const [cookies] = useCookies();
  const [orders, setOrders] = useState<IOrderPagination>({
    data: [],
    current_page: 0,
    total: 0,
    total_page: 0,
  });

  const handleFilterChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setFilterOption({
      ...filterOption,
      date: e.currentTarget.value,
      limit: 10,
    });
  };

  const [filterOption, setFilterOption] = useState<IFilterOption>({
    limit: 10,
  });

  const fetchUserOrders = () => {
    axios
      .get("http://localhost:8080/admin/orders", {
        params: filterOption,
        headers: {
          Authorization: `Bearer ${cookies.login}`,
        },
      })
      .then((data) => setOrders(data.data.data));
  };

  useEffect(() => {
    fetchUserOrders();
  }, [filterOption]);

  return (
    <DashboardWrapper>
      <AdminNavbar />
      <div className="container py-5">
        <h1>Dashboard</h1>
        <div className="input-group align-items-center">
          <label htmlFor="dateFilter">Filter</label>
          <div className="col-12 col-lg-4 ms-0 ms-lg-3">
            <select
              className="form-select"
              name="date"
              id="dateFilter"
              onChange={handleFilterChange}
            >
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
            </select>
          </div>
        </div>
        <OrderList
          orders={orders}
          setFilterOption={setFilterOption}
          filterOption={filterOption}
        />
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
