import { ButtonProps } from "@/types/buttons";
import React from "react";

//props = menentukan tipe data di atribut komponen yg kita gunakan
function ModularButton(props: ButtonProps) {
  const { children, ...rest } = props; //memisahkan children dari types yg ada di ButtonProps
  return (
    <>
      {/* ...rest = rest parameter */}
      <button {...rest}>{children}</button>
    </>
  );
}
export default ModularButton;

/*

  konsep react & knp penggunaan react di industri IT:
  tailwindCSS, slicing figma
  dom > node > virtual dom 
  dynamic route
  typescript
  spread ... , rest parameter ...rest, 
  state management, useState, useEffect
  fetching API, memahami API documentation
  pahamin rfce, cara buat, cara pakai, cara import, cara masang types di component
  
*/

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
