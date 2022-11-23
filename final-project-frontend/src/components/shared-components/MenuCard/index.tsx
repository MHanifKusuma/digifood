import HeartIcon from "assets/HeartIcon";
import StarIcon from "assets/StarIcon";
import { IMenu } from "interfaces/Menu";
import React, { useState } from "react";
import MenuCardWrapper from "./style";

interface MenuCardProps {
  menu: IMenu;
}

const MenuCard = ({ menu }: MenuCardProps) => {
  const [clicked, setClicked] = useState(false);

  return (
    <MenuCardWrapper className="card m-2">
      <div className="menu-image-wrapper">
        <div className="icon-wrapper" onClick={() => setClicked(!clicked)}>
          <HeartIcon height="30" fill="#E98E7D" solid={clicked} />
        </div>
        <img src={menu.MenuPhoto} className="card-img-top" alt="..." />
      </div>
      <div className="card-body">
        <h5 className="card-title">{menu.Name}</h5>
        <div className="card-info d-flex justify-content-between">
          <p className="card-text mb-0">Rp {menu.Price}</p>
          <p className="mb-0 d-flex align-items-center">
            <StarIcon height="20" fill="#ffe09c" className="me-1" />
            {menu.AverageRating} ({menu.TotalReview})
          </p>
        </div>
      </div>
    </MenuCardWrapper>
  );
};

export default MenuCard;