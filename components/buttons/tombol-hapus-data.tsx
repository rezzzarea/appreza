"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import React, { useState } from 'react'
import { Button } from "../ui/button"
import { Loader2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { deleteUser } from "@/server/users"
import { toast } from "sonner"

export default function TombolHapusData(userId:string) {
    // state u/ loading
    const [isLoading,setIsLoading] = useState(false)
    // state u/ menutup pop up dialog bila data telah terhapus
    const [isOpen,setIsOpen] = useState(false)
    // uawRouter nanti dipakai u/ refresh data tabel ketika data telah terhapus, daripada ribet klik refresh di browser
    const router = useRouter()
    const hapusData = async() => {
        try {
            setIsLoading(true) //tombol delete diklik auto jadi icon loading
            await deleteUser(userId)
            toast.success("berhasil hapus datanya alhamdulillah")
            setIsOpen(false) //menutup popup dialog
            router.refresh()
        } catch (error) {
            console.error(error)
            toast.error("astaghfirullah gagal hapus data")
        } finally {
            setIsLoading(false)
        }
    }
  return (
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  {/* asChild  tujuan u/ combo komponen ui shadcn agar tidak error*/}
  <DialogTrigger asChild>
    <Button variant="ghost">
        <Trash2 className="size-4" />
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Yakin ingin hapus?</DialogTitle>
      <DialogDescription>
        Tolong dipikirkan baik-baik karena perintah ini tidak dapat diulang
      </DialogDescription>
      <Button variant="destructive" disabled={isLoading} onClick={hapusData}>
        {isLoading?<Loader2 className="size-4 animate-spin"/>:"Delete"}
      </Button>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}
