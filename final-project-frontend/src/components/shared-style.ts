import styled from "styled-components";

export const CustomForm = styled.form`
  width: 100%;

  input {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    padding: 0.75rem;
  }
`;

export const ErrorMessage = styled.p`
  color: #e98e7d;
  margin-bottom: 0;
  margin-top: 5px;
`;

export const DeliveryStatusWrapper = styled.div`
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
`;

export const DiscountedPrice = styled.p`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  .strike {
    text-decoration: line-through;
    color: #e98e7d;
    margin-left: 0.25rem;
    font-size: 0.75rem;
    font-weight: 400 !important;
  }
`;
