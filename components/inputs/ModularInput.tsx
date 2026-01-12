import { InputProps } from "@/types/inputs";
import React from "react";

/* 
ketika props interface g dikasih ? maka sifatnya wajib / tidak opsional ketika dipanggil
onChange untuk mengambil value yg berubah setelah diketik
*/

function ModularInput(props: InputProps) {
  return (
    <>
      {/* ... = spread */}
      <input type="text" {...props} />
    </>
  );
}

export default ModularInput;
