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

// setupform1: validation dan import library dengan zod dan react-hook-form
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { createNote } from "@/server/notes"
const formSchema = z.object({
  name: z.string().min(2).max(50),
})


export default function CreateNoteButton({notebookId}:{notebookId:string}) {
  // setupform2: router utk refresh halaman setelah buat notebook baru, state loading utk menandakan proses submit sedang berjalan, state open utk menandakan dialog terbuka atau tidak, default value form, dan function onSubmit
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)
  const [isOpen,setIsOpen] = useState(false)
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
      name: "",
      },
  })
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      // console.log(values)
      try {
          // ini state yg mbuat ketika kita klik tombol submit tulisan di tombolnya berubah jd icon loading
          setIsLoading(true) 
          // cara u/ mendapatkan userId berdasarkan siapa yg udh login
          const userId = (await authClient.getSession()).data?.user.id
          if (!userId){
              toast.error("silahkan login terlebih dahulu untuk membuat jurnal")
              return
          }
          const response = await createNote({
              // ...values,
              // userId,
              title: values.name,
              notebookId,
              content: {}, //bukan string kosong krn di database catetannya tersimpan dlm json, {} = objek kosong
          })
          if (response.success){
              // menghapus form input agar menjadi kosong
              form.reset()
              // menampilkan pesan dg ui sonner
              toast.success("lembar catatan telah terbuat alhamdulillah")
              // refresh halaman
              router.refresh()
              // menutup dialog dg state false
              setIsOpen(false)
          } else {
              // menampilkan pesan error dg ui sonner
              toast.error(response.message)
          }
      } catch (error) {
          // menampilkan pesan error dg ui sonner
          toast.error("failed to create note")  
          console.log(error)
      } finally {
          // membuat icon loading yg berputar kembali menjadi tulisan karena proses ny sudah selesai
          setIsLoading(false)
      }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* komponen Button kalau kita mau sempil didalam komponen shadcn misalnya dialog harus pembungkus Button nya ini dikasih atribut asChild agar tidak konflik*/}
      <DialogTrigger asChild>
        <Button>Create Note</Button>
      </DialogTrigger>
      <DialogContent>
          <DialogHeader>
          <DialogTitle>Create Your Note</DialogTitle>
            <DialogDescription>
                Create a new note to organize your ideas.
            </DialogDescription>
          </DialogHeader>
          {/* setupform3: nyempilin komponen form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="My Note" {...field} />
                    </FormControl>
                    <FormDescription>
                        Enter a name for your note.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button disabled={isLoading} type="submit">
                    {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Create"}
                </Button>
            </form>
          </Form>
      </DialogContent>
    </Dialog>
  )
}
