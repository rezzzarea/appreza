import React from "react";
import ModularInput from "./ModularInput";
import { InputProps } from "@/types/inputs";

function AreaInput(props:InputProps) {
  return (
    <ModularInput
      className="bg-amber-700 px-4 py-1 rounded-2xl focus:ring-red-500 outline-yellow-500 focus:ring-2"
      {...props}
    />
  );
}

export default AreaInput;
