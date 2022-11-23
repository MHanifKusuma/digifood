import { IconProps } from "interfaces/Icons";
import React from "react";
import TriangleStyleWrapper from "./style";

const TriangleIcon = ({
  height,
  fill = "#000000",
  className,
  style,
}: IconProps) => {
  return (
    <TriangleStyleWrapper
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      fill={fill}
      className={`bi bi-triangle-fill ${className ? className : ""}`}
      viewBox="0 0 16 16"
      customStyle={style}
    >
      <path
        fill-rule="evenodd"
        d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"
      />
    </TriangleStyleWrapper>
  );
};

export default TriangleIcon;
