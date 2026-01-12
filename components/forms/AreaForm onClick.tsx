"use client";

import React, { useState } from "react";
import AreaButton from "../buttons/AreaButton";
import AreaInput from "../inputs/AreaInput";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

function AreaForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(""); //state = variable yg bisa berubah krn event di JS
  const router = useRouter(); //useRouter u/ pindah halaman berdasarkan JS events / function bukan klik spt anchor
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      console.log("Input value:", inputValue);
      const slug = inputValue.trim(); //trim u/ ilangin spasi
      router.push(`/area/${slug}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="flex gap-4">
      <AreaInput
        className="bg-green-300 text-black"
        placeholder="type area name i.e. bali"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <AreaButton
        type="button"
        className="w-20 flex justify-center px-12 bg-red-100"
        disabled={isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Search"}
      </AreaButton>
    </form>
  );
}

export default AreaForm;
