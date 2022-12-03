import { CSSProperties } from "react";
import styled from "styled-components";

interface SearchBarWrapperProp {
  style: CSSProperties;
}

const SearchBarWrapper = styled.div<SearchBarWrapperProp>`
  background-color: #ffe09c;

  ${(props) => (props.style ? { ...props.style } : "")}
`;

export default SearchBarWrapper;
