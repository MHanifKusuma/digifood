import styled from "styled-components";

const AdminOrderDetailWrapper = styled.div``;

export const OrderDetailContent = styled.div`
  display: flex;
  flex-direction: column-reverse;
  min-height: 100vh;

  @media screen and (min-width: 992px) {
    flex-direction: row;
  }
`;

export default AdminOrderDetailWrapper;
