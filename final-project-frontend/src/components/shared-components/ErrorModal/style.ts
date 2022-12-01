import { CSSProperties } from "react";
import styled from "styled-components";

export interface ModalStyle {
  ModalStyle?: CSSProperties;
}

const ErrorModalWrapper = styled.div<ModalStyle>`
  background-color: rgba(0, 0, 0, 0.5);
  ${(props) => (props.ModalStyle ? { ...props.ModalStyle } : "")};
`;

export default ErrorModalWrapper;
