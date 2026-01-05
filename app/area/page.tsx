import AreaButton from "@/components/buttons/AreaButton";
import ModularButton from "@/components/buttons/ModularButton";
import AreaInput from "@/components/inputs/AreaInput";
import ModularInput from "@/components/inputs/ModularInput";
import React from "react";

function AreaPage() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-amber-200">
      <AreaInput className="bg-white text-black" placeholder="type area name to search" /> 
      <AreaButton />
    </div>
  );
}

export default AreaPage;
