import { CSSProperties } from "react";
import styled from "styled-components";

export interface ModalStyle {
  ModalStyle?: CSSProperties;
}

const CheckoutModalWrapper = styled.div<ModalStyle>`
  background-color: rgba(0, 0, 0, 0.5);
  ${(props) => (props.ModalStyle ? { ...props.ModalStyle } : "")};

  h1 {
    letter-spacing: 2px;
  }

  table {
    td {
      vertical-align: middle;
    }
  }
`;

export default CheckoutModalWrapper;
