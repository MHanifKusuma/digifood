import styled from "styled-components";

const CartItemListWrapper = styled.section`
  .empty-cart-info {
    text-align: center;
  }
`;

export const CartItem = styled.div`
  border: 1px solid #000000;

  img {
    width: 100%;
  }

  input {
    width: 75px;
  }
`;

export default CartItemListWrapper;
