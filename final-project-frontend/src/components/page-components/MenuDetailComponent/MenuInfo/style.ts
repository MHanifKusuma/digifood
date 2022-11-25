import styled from "styled-components";

const MenuInfoWrapper = styled.section`
  .strike {
    text-decoration: line-through;
    color: #e98e7d;
    margin-left: 0.25rem;
    font-size: 1rem;
  }

  input {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type="number"] {
      -moz-appearance: textfield;
    }
  }
`;

export const MenuOptionWrapper = styled.div`
  @media screen and (min-width: 1200px) {
    background-color: #ffffff;
    border-radius: 20px;
    max-height: 350px;
    overflow: auto;

    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 2px grey;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #d9d9d9;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #d3d3d3;
    }
  }
`;

export const OptionItem = styled.div`
  border: 1px solid black;
  padding: 1rem;
  display: flex;
  justify-content: space-between;

  label {
    width: 100%;

    span {
      font-size: 0.75rem;
    }
  }
  input {
    width: 20px;
  }

  &:first-of-type {
    border-radius: 20px 20px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 20px 20px;
  }
`;

export default MenuInfoWrapper;
