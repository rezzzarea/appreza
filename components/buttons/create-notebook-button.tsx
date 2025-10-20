// setiap button pasti ada interaksinya, maka harus pakai use client
"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
const formSchema = z.object({
  name: z.string().min(2, { message: "Nama minimal 2 karakter" }).max(50, { message: "Nama maksimal 50 karakter" }),
})
export default function CreateNotebookButton() {
  return (
    <Dialog>
      {/* komponen Button kalau kita mau sempil didalam komponen shadcn misalnya dialog harus pembungkus Button nya ini dikasih atribut asChild agar tidak konflik*/}
      <DialogTrigger asChild>
        <Button>Create Journal</Button>
      </DialogTrigger>
      <DialogContent>
          <DialogHeader>
          <DialogTitle>Create Your Journal</DialogTitle>
          <DialogDescription>
              Create a new journal to organize your notes and ideas.
          </DialogDescription>
          </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
