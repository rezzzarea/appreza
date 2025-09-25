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

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "contoh",
    label: "Astro",
  },
]

export default function DropdownSurat(
  {suratTerpilih,suratYgBerubah}:{
    suratTerpilih:string
    suratYgBerubah:(value:string) => void
  }
) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(suratTerpilih)
  const [quranData, setQuranData] = React.useState<{
    value:string 
    label:string
  }[]>([]) //menyesuaikan value dan label agar ber-object array []
  React.useEffect(()=>{
    const getData = async() => {
      const data = await fetchDataQuran()
      const formattedData = data.map((isijson)=>({
        value: isijson.nomor.toString(),
        label: isijson.namaLatin
      })) //formatted data = data yg sudah dimapping & dirapikan agar sesuai format yg dibutuhkan ui shadcn
      setQuranData(formattedData)
    }
    getData() //panggil sekali u/ nampilin di combobox
  },[]) // [] agar fetching data api nya g bertubi" / sekali saja
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? quranData.find((nomorSurat) => nomorSurat.value === value)?.label
            : "Silahkan pilih surat"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="ketik nomor surat" />
          <CommandList>
            <CommandEmpty>surat apa maksudnya?</CommandEmpty>
            <CommandGroup>
              {quranData.map((isiFormattedQuran) => (
                <CommandItem
                  key={isiFormattedQuran.value}
                  value={isiFormattedQuran.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    suratYgBerubah(currentValue)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === isiFormattedQuran.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {isiFormattedQuran.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}