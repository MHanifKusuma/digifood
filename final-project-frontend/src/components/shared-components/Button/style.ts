import { CSSProperties } from "react";
import styled from "styled-components";
import { darkerColor } from "utils";

export interface ButtonStyle {
  buttonStyle?: CSSProperties;
}

const CustomButton = styled.button<ButtonStyle>`
  padding: 0.5rem 0.75rem;
  border: none;
  background-color: rgba(78, 165, 234, 255);
  border-radius: 10px;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      darkerColor(props.buttonStyle?.backgroundColor, 0.2)};
  }

  &.disabled {
    cursor: not-allowed;
    background-color: #a8a8a8;

    &:hover {
      background-color: #a8a8a8;
    }
  }

  ${(props) => (props.buttonStyle ? { ...props.buttonStyle } : "")};
`;

export default CustomButton;
