import styled from "styled-components";

const AuthenticationWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 992px) {
    flex-direction: row;
  }
`;

export const AuthenticationLogo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 500px;
  }
`;

export const AuthenticationForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default AuthenticationWrapper;
