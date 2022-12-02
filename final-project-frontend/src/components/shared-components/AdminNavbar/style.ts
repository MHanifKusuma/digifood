import styled from "styled-components";
import Navbar from ".";

const NavbarWrapper = styled.nav`
  background-color: #292b36;
  a {
    color: #ffffff;

    &:hover {
      color: #ffffff;
    }
  }
`;

export const NavbarLogo = styled.div`
  img {
    width: 50px;
  }

  a {
    margin-right: 0.25rem;
  }

  h5 {
    margin-bottom: 0;
  }
`;

export const NavigationLink = styled.div`
  a {
    &:not(.hover-none) {
      background-image: linear-gradient(#ffffff 0 0);
      background-position: 0 100%; /*OR bottom left*/
      background-size: 0% 2px;
      background-repeat: no-repeat;
      transition: background-size 0.3s, background-position 0s 0.3s; /*change after the size immediately*/
      padding: 0;

      &:hover {
        color: #ffffff;
        background-position: 100% 100%; /*OR bottom right*/
        background-size: 100% 2px;
      }
    }

    &.active {
      font-weight: bold;
    }
  }

  i {
    font-size: 1rem;
  }
`;

export default NavbarWrapper;
