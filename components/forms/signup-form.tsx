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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { signUpUser } from "@/server/users"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import Link from "next/link"

// const formSchema = z.object({
//   email: z.email(),
//   password: z.string().min(8),
//   confirmPassword: z.string().min(8),
//   name: z.string().min(1)
// })  

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  name: z.string().min(1),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // field to attach error
});

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [isLoading,setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
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
    try {
      setIsLoading(true)
      const response = await signUpUser(
        values.email,
        values.password,
        values.name
      )
      if (response.success){
        toast.success("Please check your email for verification")
      } else {
        toast.error(response.message )
      }
    } catch (error) {
      console.error(error)      
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Enter your details below to create your account
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
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="example: be@gmail.com" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                              This is your email.
                            </FormDescription> */}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="example: fulan" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                              This is your email.
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
                              <div className="flex items-center">
                                <FormLabel>Password</FormLabel>
                              </div>
                            <FormControl>
                              <Input type="password" placeholder="*****" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                              This is your password.
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
                              <div className="flex items-center">
                                <FormLabel>Confirm Password</FormLabel>
                              </div>
                            <FormControl>
                              <Input type="password" placeholder="*****" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                              This is your password.
                            </FormDescription> */}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {/* {isLoading ? (<Loader2 className="size-4 animate-spin"/>)} */}
                        {/* {isLoading ? (<Loader2 className="size-4 animate-spin" />) : ("Sign Up")} */}
                        {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Sign Up"}
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
