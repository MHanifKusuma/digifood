import React from "react";
import { CSSProperties } from "react";
import CustomButton from "./style";

export interface IButtonProps {
  btnFunction?: (args: any) => void;
  btnClass?: string;
  btnStyle?: CSSProperties;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button = ({
  btnFunction,
  btnClass,
  btnStyle,
  children,
  disabled = false,
}: IButtonProps) => {
  return (
    <CustomButton
      className={`${btnClass}`}
      onClick={btnFunction}
      buttonStyle={btnStyle}
      disabled={disabled}
    >
      {children}
    </CustomButton>
  );
};

export default Button;
