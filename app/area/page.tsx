import AreaButton from "@/components/buttons/AreaButton";
import ModularButton from "@/components/buttons/ModularButton";
import AreaInput from "@/components/inputs/AreaInput";
import ModularInput from "@/components/inputs/ModularInput";
import React from "react";

function AreaPage() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-amber-200">
      <AreaInput
        className="bg-green-300 text-black"
        placeholder="type area name i.e. bali"
      />
      <AreaButton className="w-20 flex justify-center px-12 bg-green-500">
        Search
      </AreaButton>
    </div>
  );
}

export default AreaPage;
