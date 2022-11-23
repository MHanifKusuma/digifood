import styled from "styled-components";

const MenuCardWrapper = styled.div`
  border-radius: 20px;
  border: none;
  box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.25);
  transition: all 0.25s ease-in-out;

  &:hover {
    box-shadow: 0px 4px 20px 5px rgba(0, 0, 0, 0.35);
  }

  .menu-image-wrapper {
    position: relative;

    .icon-wrapper {
      position: absolute;
      top: 5px;
      left: 5px;
      background-color: #ffffff;
      padding: 0.3rem;
      border-radius: 50%;
      border: 1px solid black;
    }
  }
  img {
    border-radius: 20px 20px 0 0;
  }
`;

export default MenuCardWrapper;
