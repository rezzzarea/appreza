import React from "react";
import ModularButton from "./ModularButton";
import { ButtonProps } from "@/types/buttons";
function AreaButton(props: ButtonProps) {
  const { className, children, ...rest } = props;
  return (
    <ModularButton
      className={`${className} bg-blue-700 px-4 py-1 rounded-2xl focus:ring-red-500 outline-yellow-500 focus:ring-2`}
      {...rest}
    >
      {children}
    </ModularButton>
  );
}
export default AreaButton;
