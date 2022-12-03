import React from "react";
import { CSSProperties } from "react";
import CustomButton from "./style";

export interface IButtonProps {
  btnFunction?: (args: any) => void;
  btnClass?: string;
  btnStyle?: CSSProperties;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({
  btnFunction,
  btnClass,
  btnStyle,
  children,
  disabled = false,
  type,
}: IButtonProps) => {
  return (
    <CustomButton
      className={`${btnClass} ${disabled ? "disabled" : ""}`}
      onClick={btnFunction}
      buttonStyle={btnStyle}
      disabled={disabled}
      type={type || "button"}
    >
      {children}
    </CustomButton>
  );
};

export default Button;
