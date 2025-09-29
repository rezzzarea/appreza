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
// import { useRouter } from "next/navigation"
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
  email: z.email(), //menentukan validasi form agar muncul teguran bila salah input di form
})

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    // const router = useRouter() //fungsinya mengaktifkan fitur router yg kita pakai u/ ganti halaman bila login berhasil
    const [isLoading,setIsLoading] = useState(false) //fungsinya sebagai keran untuk mencegah spam submit data form ke database
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        // username: "",
        email: "", //value yang akan dikirim bila form tidak diisi ketika disubmit
      },
    })
   


    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {

      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      // console.log(values)
        setIsLoading(true) //mengaktifkan state loading ketika user submit form

        const {error} = await authClient.forgetPassword({
          email:values.email, 
          redirectTo: "/reset-password"
        })
        
        if (error){
          toast.error(error.message)
        } else {
          toast.success("Sudah dikirim reset email nya, mohon izin cek email yaa, syukronn !")
        }

        setIsLoading(false)
      
    }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to reset your password
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
