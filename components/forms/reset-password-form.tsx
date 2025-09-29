"use client"
import { z } from "zod"
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

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client"

const formSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
  // email: z.email(), //menentukan validasi form agar muncul teguran bila salah input di form
})

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const searchParams = useSearchParams() //u/ ambil token dari address browser
    const token = searchParams.get("token") as string
    const router = useRouter() //fungsinya mengaktifkan fitur router yg kita pakai u/ ganti halaman bila login berhasil
    const [isLoading,setIsLoading] = useState(false) //fungsinya sebagai keran untuk mencegah spam submit data form ke database
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        // username: "",
        // email: "", //value yang akan dikirim bila form tidak diisi ketika disubmit
        password:"",
        confirmPassword:"",
      },
    })
   


    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {

      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      // console.log(values)
        setIsLoading(true) //mengaktifkan state loading ketika user submit form

        // logika opsional u/ menampilkan toast saat error confirm password
        if (values.password !== values.confirmPassword){
          toast.error("astaghfirullah confirm password nya ngga sama afwann tolong cek lagi")
          setIsLoading(false)
          return
        }
        // mengaktifkan fitur reset password dan pengisian token dr better auth
        const {error} = await authClient.resetPassword({
          newPassword:values.password, 
          token,
        })
        
        if (error){
          toast.error(error.message)
        } else {
          toast.success("alhamdulillah reset password telah berhasil, barakallaahu fiik")
          router.push("/login")
        }

        setIsLoading(false)
      
    }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your new password
          </CardDescription>
        </CardHeader>
        <CardContent>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              // pr buat fitur email / username
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="minimal 8 karakter" {...field} />
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
              // pr buat fitur email / username
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="minimal 8 karakter" {...field} />
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
                {isLoading ? (<Loader2 className="size-4 animate-spin" />) : ("Reset Password") }
              </Button>


            </div>
          </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
      </form>
    </Form>


        </CardContent>
      </Card>
    </div>
  )
}
