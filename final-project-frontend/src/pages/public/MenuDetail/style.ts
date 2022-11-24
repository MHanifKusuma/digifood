import styled from "styled-components";

const MenuDetailWrapper = styled.div`
  min-height: calc(100vh - 82.5px);
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
`;

export default MenuDetailWrapper;
