import { CSSProperties } from "react";
import styled from "styled-components";

export interface TriangleStyle {
  customStyle?: CSSProperties;
}

const TriangleStyleWrapper = styled.svg<TriangleStyle>`
  ${(props) => (props.customStyle ? { ...props.customStyle } : "")};
`;

export default TriangleStyleWrapper;
