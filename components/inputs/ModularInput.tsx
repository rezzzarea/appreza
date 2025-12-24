import { InputProps } from "@/types/inputs";
import React from "react";

/* 
ketika props interface g dikasih ? maka sifatnya wajib / tidak opsional ketika dipanggil
onChange untuk mengambil value yg berubah setelah diketik
*/


function ModularInput({
  placeholder,
  className,
  value,
  onChange,
}: InputProps) {
  return (
    <>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className={`${className}`}
        onChange={onChange}
      />
    </>
  );
}

export default ModularInput;
