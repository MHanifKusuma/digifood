import styled from "styled-components";

const AdminCouponListWrapper = styled.div`
  .coupon-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
    justify-content: start;

    @media screen and (min-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export const CouponWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  transition: all 0.15s ease-in-out;

  .status {
    border-radius: 20px;
    padding: 0.2rem 0.5rem;
    font-weight: 500;

    &.not-available {
      background-color: #e98e7d;
    }

    &.available {
      background-color: #aad4b3;
    }
  }

  &:hover {
    box-shadow: 0 4px 10px 5px #d9d9d9;
  }
`;

export default AdminCouponListWrapper;
