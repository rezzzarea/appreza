"use client"
import { email, z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signInUser, signUpUser } from "@/server/users"
import { toast } from "sonner"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  email: z.email(), //menentukan validasi form agar muncul teguran bila salah input di form
  password: z.string().min(8), // minimal 8 karakter
  confirmPassword: z.string().min(8), // minimal 8 karakter
  name: z.string().min(1), // fitur u/ memvalidasi confirm password
}).refine((data) => data.password === data.confirmPassword,{
  message:"afwan... mungkin boleh diliat lg blm sama passwordnya",
  path:["confirmPassword"], //target form field yg akan kita suntik pesan teguran nya
})

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    // const router = useRouter() //fungsinya mengaktifkan fitur router yg kita pakai u/ ganti halaman bila login berhasil
    // pr berhasil signup diarahkan ke hlm login
    const [isLoading,setIsLoading] = useState(false) //fungsinya sebagai keran untuk mencegah spam submit data form ke database
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        // username: "",
        email: "", //value yang akan dikirim bila form tidak diisi ketika disubmit
        password: "",
        confirmPassword: "",
        name: "",
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {

      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      // console.log(values)
      console.log("Form submitted", values)
      try {
        setIsLoading(true) //mengaktifkan state loading ketika user submit form
        const response = await signUpUser(
          values.email,values.password,values.name) //memanggil api signIn dari users.ts yg udh dibuat u/ login berdasarkan data form yg disubmit
        if (response.success){
          toast.success("Selanjutnya silahkan cek email untuk verifikasi data")
          // pr, jika berhasil sign-up langsung ke halaman login
          // router.push("/dashboard")
        } else {
          toast.error(response.message)
        }
      } catch (error) {
        console.error(error)
      } finally { //setelah validasi form, trycatch, kondisi selesai status loading = false 
        setIsLoading(false)
      }
    }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your details below to sign up to your account
          </CardDescription>
        </CardHeader>
        <CardContent>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              // pr buat fitur email / username
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="contoh: fulan@imamnafi.com" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*******" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*******" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            <div className="flex flex-col gap-3">
              {/* aktifkan state isLoading agar g spam submit form dan menghindari over request ke database */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {/* isi button = jika state nya is Loading jadi icon spinner bila tidak tulisan login */}
                {isLoading ? (<Loader2 className="size-4 animate-spin" />) : ("Sign Up") }
              </Button>
              <Button variant="outline" className="w-full">
                Sign Up with Google
              </Button>
            </div>
          </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
      </form>
    </Form>


        </CardContent>
      </Card>
    </div>
  )
}
