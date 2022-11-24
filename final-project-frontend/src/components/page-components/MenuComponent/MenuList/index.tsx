import MenuCard from "components/shared-components/MenuCard";
import { IMenu } from "interfaces/Menu";
import React from "react";
import MenuListWrapper from "./style";

interface MenuListProps {
  menus: IMenu[];
}

const MenuList = ({ menus }: MenuListProps) => {
  return (
    <MenuListWrapper className="py-5">
      <div className="container">
        <div className="row">
          {menus.map.length > 0 ? (
            <div className="d-flex flex-wrap">
              {menus.map((menu) => (
                <div className="col-12 col-lg-3">
                  <MenuCard menu={menu} key={menu.Id} />
                </div>
              ))}
            </div>
          ) : (
            <h3>No Menu available</h3>
          )}
        </div>
      </div>
    </MenuListWrapper>
  );
};

export default MenuList;
