import UsersTable from "@/components/users-table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import UserForm from "@/components/forms/user-form";

export default async function HalamanPengguna(){
    return(
        <div className="flex flex-col gap-4 p-4 md:p-24">
            <h1 className="text-2xl font-bold">Data Hafalan al-Quran Santri</h1>
            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            Tambah Data Santri <UserPlus className="size-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Tambah Data Santri</DialogTitle>
                        <div>
                            <div>
                                <DialogDescription>
                                    Penambahan data santri insya Allah ke database online
                                </DialogDescription>
                            </div>
                            <div>
                                <UserForm />
                                
                            </div>
                        </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <UsersTable />
        </div>
    )
}