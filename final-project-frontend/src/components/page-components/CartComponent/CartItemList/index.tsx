import TrashIcon from "assets/TrashIcon";
import Button from "components/shared-components/Button";
import MenuCard from "components/shared-components/MenuCard";
import { ICartItem } from "interfaces/Cart";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartsItem,
  setCartItemsQuantity,
  setCartsTotalPrice,
} from "redux/actions/CartAction";
import { CartDispatch } from "redux/actions/CartAction/types";
import { RootState } from "redux/reducers";
import CartItemListWrapper, { CartItem } from "./style";

const CartItemList = () => {
  const cartsDispatch: CartDispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.CartsReducer);
  const isCartEmpty: boolean = items.length < 1;

  const handleReducItemQuantity = (item: ICartItem, index: number) => {
    item.Quantity -= 1;

    if (item.Quantity > 0) {
      cartsDispatch(setCartItemsQuantity(item));
    } else {
      cartsDispatch(deleteCartsItem(index));
    }

    cartsDispatch(setCartsTotalPrice(item.Price * -1));
  };

  const handleAddItemQuantity = (item: ICartItem) => {
    item.Quantity += 1;

    cartsDispatch(setCartItemsQuantity(item));
    cartsDispatch(setCartsTotalPrice(item.Price));
  };

  if (isCartEmpty) {
    return (
      <CartItemListWrapper>
        <div className="container py-5">
          <h1>Cart</h1>
          {isCartEmpty && <h4 className="empty-cart-info">Cart is empty</h4>}
        </div>
      </CartItemListWrapper>
    );
  }

  return (
    <CartItemListWrapper>
      <div className="container py-5">
        <h1>Cart</h1>
        {items.map((item, index) => (
          <CartItem className="mb-3 p-3" key={index}>
            <div className="row">
              <div className="col-12 col-lg-2 p-auto my-auto">
                <img src={item.menus.MenuPhoto} alt="menu photo" />
              </div>
              <div className="col d-flex flex-wrap mt-4 mt-lg-0">
                <div className="col">
                  <p className="fw-bolder mb-1">{item.menus.Name}</p>
                  <p>Rp {item.Price}</p>
                  <p>Add-ons: {item.AddOns || "none"}</p>
                </div>
                <div className="col d-flex align-items-center justify-content-between">
                  <div className="quantity-wrapper d-flex align-items-center">
                    <p className="mb-0 me-3">Quantity:</p>
                    <div className="d-flex">
                      <Button
                        btnClass="me-2"
                        btnStyle={{
                          padding: "0.25rem 0.6rem",
                          backgroundColor: "#579eff",
                        }}
                        btnFunction={() => handleReducItemQuantity(item, index)}
                      >
                        -
                      </Button>
                      <input
                        className="text-center"
                        type="text"
                        readOnly
                        value={item.Quantity}
                      />
                      <Button
                        btnClass="ms-2"
                        btnStyle={{
                          padding: "0.25rem 0.5rem",
                          backgroundColor: "#579eff",
                        }}
                        btnFunction={() => handleAddItemQuantity(item)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div>Rp {item.Price * item.Quantity}</div>
                  <div
                    className="trash-icon-wrapper"
                    onClick={() => {
                      cartsDispatch(setCartsTotalPrice(item.Price * -1));
                      cartsDispatch(deleteCartsItem(index));
                    }}
                  >
                    <TrashIcon
                      height="30"
                      fill="#E98E7D"
                      className="me-1 me-lg-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CartItem>
        ))}
      </div>
    </CartItemListWrapper>
  );
};

export default CartItemList;
