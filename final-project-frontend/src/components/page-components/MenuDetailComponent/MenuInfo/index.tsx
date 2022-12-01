import HeartIcon from "assets/HeartIcon";
import StarIcon from "assets/StarIcon";
import Button from "components/shared-components/Button";
import { ICartItem } from "interfaces/Cart";
import { IMenu } from "interfaces/Menu";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCartsitem, setCartsTotalPrice } from "redux/actions/CartAction";
import { CartDispatch } from "redux/actions/CartAction/types";
import { formatCurrency } from "utils/index";
import MenuInfoWrapper, { MenuOptionWrapper, OptionItem } from "./style";

interface MenuInfoProps {
  menu: IMenu;
}

const MenuInfo = ({ menu }: MenuInfoProps) => {
  const [cookies] = useCookies(["login"]);
  const navigate = useNavigate();

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
  const [totalPrice, setTotalPrice] = useState(discountedPrice);
  const [quantity, setQuantity] = useState(1);
  const [selectionAddOn, setSelectionAddOn] = useState("");
  const [optionalAddOn, setOptionalAddOn] = useState<string[]>([]);

  useEffect(() => {
    setItemPrice(discountedPrice);
    setTotalPrice(discountedPrice);
  }, [discountedPrice]);

  useEffect(() => {
    setTotalPrice(itemPrice * quantity);
  }, [itemPrice, quantity]);

  const cartDispatch: CartDispatch = useDispatch();

  const handleAddToCart = () => {
    if (!cookies.login) {
      navigate("/login");
    } else {
      let mergedOption = "";

      if (selectionAddOn !== "" && optionalAddOn.length > 0) {
        mergedOption = selectionAddOn + ", " + optionalAddOn.join(", ");
      } else {
        mergedOption = selectionAddOn;
      }

      const newCartItem: ICartItem = {
        menus: menu,
        MenuId: menu.Id,
        Price: totalPrice,
        Quantity: quantity,
        AddOns: mergedOption,
      };

      cartDispatch(addCartsitem(newCartItem));
      cartDispatch(setCartsTotalPrice(totalPrice));

      navigate("/carts");
    }
  };

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
        {menu.Promotion.Id !== 0 && (
          <span className="discounted-price">
            Rp {formatCurrency(menu.Price - menu.Promotion.Discount)}
          </span>
        )}
        <span
          className={`original-price ${menu.Promotion.Id !== 0 && "strike"}`}
        >
          Rp {formatCurrency(menu.Price)}
        </span>
      </p>

      <p className="mt-3">{menu.Description}</p>

      {menu.MenuOptions.length > 0 && (
        <>
          <h3>Add-ons</h3>
          <MenuOptionWrapper>
            {menu.MenuOptions.map((option) => (
              <OptionItem key={option.Id}>
                {option.Type === "radio" && (
                  <>
                    <label htmlFor={`${option.Id}`}>{option.Name}</label>
                    <input
                      id={`${option.Id}`}
                      type={"radio"}
                      name="option"
                      value={option.Name}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectionAddOn(e.target.value);
                        }
                      }}
                    />
                  </>
                )}
                {option.Type === "check" && (
                  <>
                    <label htmlFor={`${option.Id}`}>
                      {option.Name}{" "}
                      <span>(+ Rp {formatCurrency(option.Price)})</span>
                    </label>
                    <input
                      id={`${option.Id}`}
                      type={"checkbox"}
                      name={option.Name}
                      value={option.Name}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setItemPrice(itemPrice + option.Price);

                          optionalAddOn.push(e.target.value);
                          setOptionalAddOn(optionalAddOn);
                        } else {
                          setItemPrice(itemPrice - option.Price);

                          const filterOptionalAddOn = optionalAddOn.filter(
                            (opt) => opt !== e.target.name
                          );
                          setOptionalAddOn(filterOptionalAddOn);
                        }
                      }}
                    />
                  </>
                )}
              </OptionItem>
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
              btnFunction={() => setQuantity(quantity - 1)}
            >
              -
            </Button>
            <input
              className="w-25 text-center"
              type="number"
              readOnly
              value={quantity}
            />
            <Button
              btnClass="ms-2"
              btnStyle={{
                padding: "0.25rem 1.5rem",
                backgroundColor: "#579eff",
              }}
              btnFunction={() => {
                setQuantity(quantity + 1);
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
          btnFunction={handleAddToCart}
        >
          Add to cart (Rp {formatCurrency(totalPrice)})
        </Button>
      </div>
    </MenuInfoWrapper>
  );
};

export default MenuInfo;
