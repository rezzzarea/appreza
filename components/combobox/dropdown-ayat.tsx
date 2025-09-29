"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { fetchDataQuran } from "@/lib/quran"

// const frameworks = [
//   {
//     value: "next.js",
//     label: "Next.js",
//   },
//   {
//     value: "sveltekit",
//     label: "SvelteKit",
//   },
//   {
//     value: "nuxt.js",
//     label: "Nuxt.js",
//   },
//   {
//     value: "remix",
//     label: "Remix",
//   },
//   {
//     value: "astro",
//     label: "Astro",
//   },
// ]

export default function DropdownAyat(
    {valueSurat,ayatTerpilih,ayatYgBerubah}:{
        valueSurat:string 
        ayatTerpilih:string 
        ayatYgBerubah:(value:number)=>void
    }
) {
  const [open, setOpen] = React.useState(false)
  // const [value, setValue] = React.useState("")
  const [opsiAyat,setOpsiAyat] = React.useState<number[]>([]) // [] biar dieksekusi sekali 
/*
bentuk umum useEffect dg api 
buat function yg akan dipanggil sekali:
    misalnya get data
        didalamnya:
        -variabel u/ pemanggilan api
        -perintah u/ mengolah data api tsb
setelah dibuat dipanggil agar tereksekusi sekali ketika komponen ini dirender oleh browser
*/
  React.useEffect(()=>{
    const getData = async()=> {
        const data = await fetchDataQuran()
        const surat = data.find((nomerDariComboboxSurat)=>
            nomerDariComboboxSurat.nomor.toString() === valueSurat //cek nomor dr combobox surat
        )
        if (surat){
            setOpsiAyat(Array.from({length:surat.jumlahAyat},(_,i)=>i+1))
        }
    }
    if (valueSurat) getData()
  }, [valueSurat]) //khusus u/ komponen yg bergantung pada komponen lainnya

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {ayatTerpilih ? `Ayat ${ayatTerpilih}`: "Silahkan pilih ayatnya..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Pilih ayat tafaddhal..." />
          <CommandList>
            <CommandEmpty>Pilih suratnya agar pilihan ayatnya muncul</CommandEmpty>
            <CommandGroup>
              {opsiAyat.map((ayat) => (
                <CommandItem
                  key={ayat}
                  value={ayat.toString()}
                  onSelect={(currentValue) => {
                    const valueAngka = parseInt(currentValue,10)
                    ayatYgBerubah(valueAngka)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      ayatTerpilih === ayat.toString() ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {`Ayat ${ayat}`}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}