import styled from "styled-components";

const OrderCardWrapper = styled.div`
  border: 1px solid black;

  .row {
    flex-direction: column;

    @media screen and (min-width: 992px) {
      flex-direction: row;
    }
  }

  .align-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media screen and (min-width: 992px) {
      align-items: center;
      justify-content: center;
      text-align: start;
    }
  }

  .align-lg-start {
    @media screen and (min-width: 992px) {
      align-items: flex-start;
    }
  }

  .strike {
    text-decoration: line-through;
    color: #e98e7d;
    margin-left: 0.25rem;
    font-size: 0.75rem;
  }

  .delivery {
    border-radius: 20px;
    padding: 0.2rem 0.5rem;
    font-weight: 500;

    &.delivery-waiting-payment {
      background-color: #e98e7d;
    }

    &.delivery-cooking-order {
      background-color: #ffe09c;
    }

    &.delivery-delivering-order {
      background-color: #aad4b3;
    }

    &.delivery-order-completed {
      background-color: #579eff;
      color: #ffffff;
    }
  }

  .paid-with {
    font-size: 0.75rem;
  }
`;

export default OrderCardWrapper;
