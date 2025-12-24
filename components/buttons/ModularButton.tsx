import React from "react";

interface ModularButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}

function ModularButton({
  children,
  className = "",
  type = "button",
}: ModularButtonProps) {
  return (
    <>
      <button className={`${className}`} type={type}>
        {children}
      </button>
    </>
  );
}

export default ModularButton;

/*
0-buat react component
1-buat interface
2-buat parameter di react component u/ menghubungkan interface nya
3-meletakkan parameter di elemen pada react component
*/
