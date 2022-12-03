import { CustomForm } from "components/shared-style";
import styled from "styled-components";

const AdminMenuInfoWrapper = styled.section``;

export const AdminMenuInfoForm = styled(CustomForm)`
  p {
    margin: 0.5rem;
  }
`;

export const MenuOptionsWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 20px !important;
  box-shadow: 0 2px 10px 5px #d9d9d9;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export default AdminMenuInfoWrapper;
