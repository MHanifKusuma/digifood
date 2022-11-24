import HeartIcon from "assets/HeartIcon";
import StarIcon from "assets/StarIcon";
import Button from "components/shared-components/Button";
import { IMenu } from "interfaces/Menu";
import React, { useEffect, useState } from "react";
import MenuInfoWrapper, { MenuOptionWrapper, OptionItem } from "./style";

interface MenuInfoProps {
  menu: IMenu;
}

const MenuInfo = ({ menu }: MenuInfoProps) => {
  menu.MenuOptions.sort((i, j) => {
    if (i.Type === "radio") {
      return -1;
    } else {
      return 1;
    }
  });

  const discountedPrice =
    menu.Promotion.Id !== 0 ? menu.Price - menu.Promotion.Discount : menu.Price;

  const [itemPrice, setItemPrice] = useState(discountedPrice);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setItemPrice(discountedPrice);
  }, [discountedPrice]);

  return (
    <MenuInfoWrapper className="py-5">
      <h1 className="fs-1">{menu.Name}</h1>
      <p className="mb-0 d-flex align-items-center">
        <span className="d-flex align-items-center">
          <StarIcon height="20" fill="#ffe09c" className="me-1" />
          {menu.AverageRating} ({menu.TotalReview})
        </span>
        <span className="ms-2 d-flex align-items-center">
          <HeartIcon solid height="20" fill="#e98e7d" className="me-1" />
          {menu.TotalFavorites}
        </span>
      </p>

      <p className="card-text mb-0 d-flex align-items-start fs-4 mt-4">
        {menu.Promotion.Id != 0 && (
          <span className="discounted-price">
            Rp {menu.Price - menu.Promotion.Discount}
          </span>
        )}
        <span
          className={`original-price ${menu.Promotion.Id != 0 && "strike"}`}
        >
          Rp {menu.Price}
        </span>
      </p>

      <p className="mt-3">{menu.Description}</p>

      {menu.MenuOptions.length > 0 && (
        <>
          <h3>Add-ons</h3>
          <MenuOptionWrapper>
            {menu.MenuOptions.map((option) => (
              <>
                {option.Type == "radio" && (
                  <OptionItem>
                    <label htmlFor={`${option.Id}`}>{option.Name}</label>
                    <input id={`${option.Id}`} type={"radio"} name="option" />
                  </OptionItem>
                )}
                {option.Type == "check" && (
                  <OptionItem>
                    <label htmlFor={`${option.Id}`}>
                      {option.Name} <span>(+ Rp {option.Price})</span>
                    </label>
                    <input
                      id={`${option.Id}`}
                      type={"checkbox"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setItemPrice(itemPrice + option.Price);
                        } else {
                          setItemPrice(itemPrice - option.Price);
                        }
                      }}
                    />
                  </OptionItem>
                )}
              </>
            ))}
          </MenuOptionWrapper>
        </>
      )}
      <div className="d-flex flex-column">
        <div className="mt-3">
          <p className="text-center">Quantity:</p>
          <div className="d-flex justify-content-center">
            <Button
              btnClass="me-2"
              btnStyle={{
                padding: "0.25rem 1.5rem",
                backgroundColor: "#579eff",
              }}
            >
              -
            </Button>
            <input className="w-25 text-center" type="number" value={1} />
            <Button
              btnClass="ms-2"
              btnStyle={{
                padding: "0.25rem 1.5rem",
                backgroundColor: "#579eff",
              }}
            >
              +
            </Button>
          </div>
        </div>
        <Button
          btnClass="mt-3"
          btnStyle={{
            padding: "0.5rem 2rem",
            backgroundColor: "#aad4b3",
            color: "#ffffff",
          }}
        >
          Add to cart (Rp {itemPrice})
        </Button>
      </div>
    </MenuInfoWrapper>
  );
};

export default MenuInfo;
