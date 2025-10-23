"use client"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Notebook } from "@/db/schema"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { deleteNotebook } from "@/server/notebook"
import { toast } from "sonner"
import Link from "next/link"
import { Button } from "../ui/button"
import { Loader2, Trash2 } from "lucide-react"
interface NotebookCardProps{
    notebook:Notebook
}
export default function NotebookCard({notebook}:NotebookCardProps) {
    const router = useRouter()
    const [isOpen,setIsOpen] = useState(false)
    const [isDeleting,setIsDeleting] = useState(false)
    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            const response = await deleteNotebook(notebook.id)
            if (response.success){
                toast.success("alhamdulillah jurnal telah berhasil dihapus")
                router.refresh()
            }
        } catch (error) {
            toast.error("afwan ada kendala saat menghapus jurnal")
        } finally {
            setIsDeleting(false)
        }
    }
    return (
    <Card>
    <CardHeader>
        <CardTitle>{notebook.name}</CardTitle>
        {/* <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction> */}
    </CardHeader>
    <CardContent>
        <p>{notebook.notes?.length??0} notes</p>
    </CardContent>
    <CardFooter className="flex justify-end gap-2">
        {/* <p>Card Footer</p> */}
        <Link href={`/dashboard/notebook/${notebook.id}`}>
            <Button variant="outline" >View</Button>
        </Link>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
            <Button
                variant={"destructive"}
                disabled={isDeleting}
            >
                {isDeleting ? (<Loader2 className="size-4 animate-spin"/>) : (<Trash2 className="size-4"/>)}
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your journal
                and remove your data from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    </CardFooter>
    </Card>
  )
}
