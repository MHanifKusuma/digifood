import styled from "styled-components";

const CartSummaryWrapper = styled.section`
  position: sticky;
  bottom: 0;
  box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.25);
  background-color: #ffffff;

  p {
    margin-bottom: 0;
  }
`;

export const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1200px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }

  span {
    font-weight: 500;
  }
`;

export default CartSummaryWrapper;
