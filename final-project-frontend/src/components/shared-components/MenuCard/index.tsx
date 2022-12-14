import HeartIcon from "assets/HeartIcon";
import StarIcon from "assets/StarIcon";
import { IMenu } from "interfaces/Menu";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "utils/index";
import MenuCardWrapper, { FavoriteIcon } from "./style";
import defaultImage from "assets/default-image.png";

interface MenuCardProps {
  menu: IMenu;
}

const MenuCard = ({ menu }: MenuCardProps) => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="position-relative">
      <FavoriteIcon
        className="icon-wrapper"
        onClick={() => setClicked(!clicked)}
        role="button"
      >
        <HeartIcon height="30" fill="#E98E7D" solid={clicked} />
      </FavoriteIcon>

      <MenuCardWrapper
        className="card m-2"
        onClick={() => navigate(`/menus/${menu.Id}/${menu.Name}`)}
        role="button"
      >
        <div className="menu-image-wrapper">
          <img
            src={menu.MenuPhoto || defaultImage}
            className="card-img-top"
            alt="..."
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{menu.Name}</h5>
          <div className="card-info d-flex justify-content-between">
            <p className="card-text mb-0 d-flex align-items-start">
              {menu.Promotion.Id != 0 && (
                <span className="discounted-price">
                  Rp {formatCurrency(menu.Price - menu.Promotion.Discount)}
                </span>
              )}
              <span
                className={`original-price ${
                  menu.Promotion.Id != 0 && "strike"
                }`}
              >
                Rp {formatCurrency(menu.Price)}
              </span>
            </p>
            <p className="mb-0 d-flex align-items-center">
              <StarIcon height="20" fill="#ffe09c" className="me-1" />
              {menu.AverageRating} ({menu.TotalReview})
            </p>
          </div>
        </div>
      </MenuCardWrapper>
    </div>
  );
};

export default MenuCard;
