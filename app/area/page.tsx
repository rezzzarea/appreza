import AreaButton from "@/components/buttons/AreaButton";
import ModularButton from "@/components/buttons/ModularButton";
import ModularInput from "@/components/inputs/ModularInput";
import React from "react";

function AreaPage() {
  return (
    <div className="w-full h-[100vh] gap-4 flex items-center justify-center bg-amber-200">
      <form action="">
        <ModularInput
          placeholder="Cari wilayah"
          className="bg-amber-700 px-4 py-1 rounded-2xl focus:ring-red-500 outline-yellow-500 focus:ring-2"
        />
        <AreaButton />
      </form>
    </div>
  );
}

export default AreaPage;
