import { ButtonProps } from "@/types/buttons";
import React from "react";

//props = menentukan tipe data di atribut komponen yg kita gunakan
function ModularButton(props: ButtonProps) {
  const { children, ...rest } = props; //memisahkan children dari types yg ada di ButtonProps
  return (
    <>
      <button {...rest}>{children}</button>
    </>
  );
}
export default ModularButton;

// interface ModularButtonProps {
//   children: React.ReactNode;
//   className?: string;
//   type?: "button" | "submit";
// }

/*
0-buat react component
1-buat interface
2-buat parameter di react component u/ menghubungkan interface nya
3-meletakkan parameter di elemen pada react component
*/
