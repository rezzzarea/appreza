"use client"
import { Button } from "@/components/ui/button"
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
import { User } from "@/db/schema"
import { createUser, updateUser } from "@/server/users"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import DropdownSurat from "../combobox/dropdown-surat"
import DropdownAyat from "../combobox/dropdown-ayat"
interface TipeDataDrSkemaUser{
    user?:User
}
const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.email(),
  password: z.string().min(4).max(20),
  surat: z.number(),
  ayat: z.number()

//   pr kasih password
})
export default function UserForm(
    {user}:TipeDataDrSkemaUser
){
    const router = useRouter() //router u/ refresh page otomatis
    const [isLoading,setIsLoading] = useState(false) //mencegah form kesubmit berkali", isLoading = keadaannya, setIsLoading = function yg mengatur keadaannya
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        username: user?.username||"", //u/ mengambil dr input username
        email: user?.email||"", // u/mengambil dr input email
        password: user?.password||"", // u/mengambil dr input email
        surat: user?.surat||1, // default value form 1 = alfatihah
        ayat: user?.ayat||1, // default ayat = ayat 1
        },
        //pr = password ?
    })
    
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // console.log(values)
        setIsLoading(true) //aktif ketika tombol submit ditekan
        try {
            const userData = {
                ...values, //seluruh data dari input form 
                // dibawah ini klo mau tambah bawaan password
                // password:"inipasswordalaala" //bagian ini pr u/ yg password
            }
            if(user){
                await updateUser({
                    ...userData,
                    id:user.id
                })
            }else{
                await createUser(userData)
              }
              // form.reset() //setelah data tersubmit input dikosongkan
              // yg dibawah ini biar ketika refresh sesuai data terbaru
              form.reset(userData) //setelah data tersubmit input dikosongkan
              toast.success(`Alhamdulillahirobil alamin ${user?"update":"penambahan"} data santri telah berhasil dan Allah mudahkan`) //popup notifikasi yg menandakan prosesnya aman
            router.refresh()
            // router.push(router.asPath)
            setIsLoading(false)
        } catch (error) {
            toast.error(`Astaghfirullah error di ${user?"update":"penambahan"} data santri, kamu habis ngapain?`) //popup notifikasi yg menandakan prosesnya aman
        } finally {
            // setIsLoading(false) //proses komunikasi api database berakhir
        }

    }
    return(
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="silahkan isi username santri disini" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email santri, misal mas@kece.com" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password disini silahkan" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="surat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surat</FormLabel>
                  <FormControl>
                    <DropdownSurat 
                      suratTerpilih={field.value?.toString()||""}
                      suratYgBerubah={(nomorSurat)=>{
                        const noSuratUtkNeon = parseInt(nomorSurat,10)
                        field.onChange(noSuratUtkNeon) 
                      }}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ayat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ayat</FormLabel>
                  <FormControl>
                    <DropdownAyat 
                      valueSurat={form.watch("surat")?.toString()||""}
                      ayatTerpilih={field.value?.toString()||""}
                      ayatYgBerubah={field.onChange}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading?(<Loader2 className="size-4 animate-spin"/>):(
              `${user?"Perbarui":"Tambah"} Santri`
            )}
          </Button>
        </form>
      </Form>
    )
}