// https://modern-ui.org/docs/components
// recovery yg udh terhapus dr db online ?
// edit toast nyempilin username nya

"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { deleteUser } from "@/server/users"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Loader2, Trash2 } from "lucide-react"

type TipeDataIdUserTsbDiDb = {
    userId:string
}

export default function DeleteUserButton(
    {userId} : TipeDataIdUserTsbDiDb
) {
    const [isLoading,setIsLoading] = useState(false)
    const [isOpen,setIsOpen] = useState(false)
    const router = useRouter()
    const handleDelete = async()=>{
        try {
            setIsLoading(true)
            await deleteUser(userId)
            toast.success("Alhamdulillah penghapusan data santri di database online telah Allah mudahkan")
            setIsOpen(false) // menutup pop up dialog
            router.refresh() //refresh hlm stlh data terhapus
        } catch (error) {
            console.error(error)
            toast.error("Astaghfirullah penghapusan data santri qodarullah tidak berhasil")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button variant="ghost">
                <Trash2 className="size-4"/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Apakah antum yakin?</DialogTitle>
                <DialogDescription>
                    Ketika antum hapus data ini tidak bisa dipulihkan, tolong akhi.. antum pikirkan baik-baik
                </DialogDescription>
                <Button
                    variant="destructive"
                    disabled={isLoading}
                    onClick={handleDelete}
                >
                    {isLoading?<Loader2 className="size-4 animate-spin"/> : "Delete"}
                </Button>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
}
