import styled from "styled-components";
import { CSSProperties } from "react";

export interface ModalStyle {
  ModalStyle?: CSSProperties;
}

const AddMenuOptinosModalWrapper = styled.div<ModalStyle>`
  background-color: rgba(0, 0, 0, 0.5);
  ${(props) => (props.ModalStyle ? { ...props.ModalStyle } : "")};
`;

export default AddMenuOptinosModalWrapper;
