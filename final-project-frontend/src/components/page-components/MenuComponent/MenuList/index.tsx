import Button from "components/shared-components/Button";
import MenuCard from "components/shared-components/MenuCard";
import { IFilterOption } from "interfaces/FilterOption";
import { IMenu, IMenuPagination } from "interfaces/Menu";
import React, { useEffect, useState } from "react";
import MenuListWrapper from "./style";

interface MenuListProps {
  menus: IMenuPagination;
  setFilterOption: React.Dispatch<React.SetStateAction<IFilterOption>>;
  filterOption: IFilterOption;
  isLastPage: boolean;
}

const MenuList = ({
  menus,
  setFilterOption,
  filterOption,
  isLastPage,
}: MenuListProps) => {
  const [pagination, setPagination] = useState<string[]>([]);

  const handlePagination = (totalPage: number, currentPage: number) => {
    let element: string[] = [];

    const actualPage = currentPage + 1;

    if (totalPage <= 10) {
      element = Array.from(Array(menus.total_page).keys(), (index) =>
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
    handlePagination(menus.total_page, menus.current_page);
  }, [menus]);

  return (
    <MenuListWrapper className="py-5">
      <div className="container">
        <div className="row">
          {menus.data.length > 0 ? (
            <div className="d-flex flex-wrap">
              {menus.data.map((menu) => (
                <div className="col-12 col-lg-3" key={menu.Id}>
                  <MenuCard menu={menu} key={menu.Id} />
                </div>
              ))}
            </div>
          ) : (
            <h3>No Menu available</h3>
          )}
        </div>
      </div>
      <div className="d-flex gap-1">
        <Button
          btnFunction={() => {
            if (menus.current_page - 1 > 0) {
              setFilterOption({
                ...filterOption,
                page: menus.current_page - 1,
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
                menus.current_page === Number(item) ? "#579EFF" : "#FFFFFF"
              }`,
              borderColor: `${
                menus.current_page === Number(item) ? "none" : "#579EFF"
              }`,
              border: `${
                menus.current_page === Number(item) ? "none" : "1px solid"
              }`,
              color: `${
                menus.current_page === Number(item) ? "#FFFFFF" : "#579EFF"
              }`,
              padding: "0.25rem 1rem",
            }}
          >
            {item}
          </Button>
        ))}
        <Button
          btnFunction={() => {
            if (menus.current_page + 1 <= menus.total_page) {
              setFilterOption({
                ...filterOption,
                page: menus.current_page + 1,
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
    </MenuListWrapper>
  );
};

export default MenuList;
