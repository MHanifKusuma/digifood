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
`;

export default AdminCouponListWrapper;
