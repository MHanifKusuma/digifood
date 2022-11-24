import Button from "components/shared-components/Button";
import MenuCard from "components/shared-components/MenuCard";
import { IFilterOption } from "interfaces/FilterOption";
import { IMenu } from "interfaces/Menu";
import React from "react";
import MenuListWrapper from "./style";

interface MenuListProps {
  menus: IMenu[];
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
  return (
    <MenuListWrapper className="py-5">
      <div className="container">
        <div className="row">
          {menus.map.length > 0 ? (
            <div className="d-flex flex-wrap">
              {menus.map((menu) => (
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
      {!isLastPage && (
        <Button
          btnFunction={() =>
            setFilterOption({
              ...filterOption,
              limit: filterOption.limit ? filterOption.limit + 4 : 4,
            })
          }
          btnStyle={{
            backgroundColor: "#AAD4B3",
            color: "#FFFFFF",
            padding: "0.5rem 3rem",
          }}
          btnClass="mt-5"
        >
          See more
        </Button>
      )}
    </MenuListWrapper>
  );
};

export default MenuList;
