import Button from "components/shared-components/Button";
import { IFilterOption } from "interfaces/FilterOption";
import { IOrder, IOrderPagination } from "interfaces/Order";
import React, { useEffect, useState } from "react";
import OrderCard from "../OrderCard";
import OrderListWrapper from "./style";

interface OrderListProp {
  orders: IOrderPagination;
  setFilterOption: React.Dispatch<React.SetStateAction<IFilterOption>>;
  filterOption: IFilterOption;
  isLastPage: boolean;
}

const OrderList = ({
  orders,
  setFilterOption,
  filterOption,
  isLastPage,
}: OrderListProp) => {
  const [pagination, setPagination] = useState<string[]>([]);

  const handlePagination = (totalPage: number, currentPage: number) => {
    let element: string[] = [];

    const actualPage = currentPage + 1;

    if (totalPage <= 10) {
      element = Array.from(Array(orders.total_page).keys(), (index) =>
        String(index + 1)
      );
    } else {
      if (actualPage <= 4) {
        element = ["1", "2", "3", "...", String(totalPage)];
      } else if (actualPage < 6) {
        element = [
          "1",

          "...",

          String(actualPage - 2),

          String(actualPage - 1),

          String(actualPage),

          "...",

          String(totalPage),
        ];
      } else if (actualPage < totalPage && actualPage > 4) {
        element = [
          "1",

          "...",

          String(actualPage - 3),

          String(actualPage - 2),

          String(actualPage - 1),

          "...",

          String(totalPage),
        ];
      } else if (actualPage > totalPage - 4) {
        element = [
          "1",

          "...",

          String(totalPage - 2),

          String(totalPage - 1),

          String(totalPage),
        ];
      } else {
        element = [
          "1",

          "...",

          String(actualPage - 1),

          String(actualPage),

          String(actualPage + 1),

          "...",

          String(totalPage),
        ];
      }
    }

    setPagination(element);
  };

  useEffect(() => {
    handlePagination(orders.total_page, orders.current_page);
  }, [orders]);
  return (
    <OrderListWrapper>
      <div className="container py-3">
        {orders.data.length > 0 ? (
          <>
            {orders.data.map((order) => (
              <OrderCard order={order} key={order.Id} />
            ))}
          </>
        ) : (
          <h3>No order found</h3>
        )}
      </div>
      <div className="d-flex gap-1 justify-content-center">
        <Button
          btnFunction={() => {
            if (orders.current_page - 1 > 0) {
              setFilterOption({
                ...filterOption,
                page: orders.current_page - 1,
              });
            }
          }}
          btnStyle={{
            backgroundColor: "#579EFF",
            color: "#FFFFFF",
            padding: "0.25rem 1rem",
          }}
        >
          {`<`}
        </Button>
        {pagination.map((item, index) => (
          <Button
            btnFunction={() => {
              if (item !== "...") {
                setFilterOption({
                  ...filterOption,
                  page: Number(item),
                });
              }
            }}
            btnStyle={{
              backgroundColor: `${
                orders.current_page === Number(item) ? "#579EFF" : "#FFFFFF"
              }`,
              borderColor: `${
                orders.current_page === Number(item) ? "none" : "#579EFF"
              }`,
              border: `${
                orders.current_page === Number(item) ? "none" : "1px solid"
              }`,
              color: `${
                orders.current_page === Number(item) ? "#FFFFFF" : "#579EFF"
              }`,
              padding: "0.25rem 1rem",
            }}
          >
            {item}
          </Button>
        ))}
        <Button
          btnFunction={() => {
            if (orders.current_page + 1 <= orders.total_page) {
              setFilterOption({
                ...filterOption,
                page: orders.current_page + 1,
              });
            }
          }}
          btnStyle={{
            backgroundColor: "#579EFF",
            color: "#FFFFFF",
            padding: "0.25rem 1rem",
          }}
        >
          {`>`}
        </Button>
      </div>
    </OrderListWrapper>
  );
};

export default OrderList;
