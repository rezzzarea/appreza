import { getUsers } from "@/server/users"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "./ui/button"
import { Pencil } from "lucide-react"
import UserForm from "./forms/user-form"
import DeleteUserButton from "./delete-user-button"
import { fetchDataQuran } from "@/lib/quran"
export default async function UsersTable(){
    const users = await getUsers() //menghubungkan / mengambil data dari api user agar siap pakai
    const dataQuran = await fetchDataQuran() //mendapatkan data dari api quran ke table
    const pencariNamaSurat = (nomorSurat:number) => { //fungsi yg digunakan u/ mengolah data quran berdasarkan 
      if (nomorSurat === 0){
        return "qoddarullah datanya kosong"
      }
      const namaSurat = dataQuran.find((nomerSuratDariAPI) => nomerSuratDariAPI.nomor === nomorSurat)
      return namaSurat ? namaSurat.namaLatin : 0
    }
    return(
      <Table>
        <TableCaption>Data Hafalan al-Quran Santri</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Username</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Nama Surat</TableHead>
            <TableHead>Jumlah Ayat</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user)=>(
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.username}</TableCell>
            <TableCell>{user.password}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{pencariNamaSurat(user.surat ?? 0)}</TableCell>
            <TableCell>{user.ayat ?? "kamana ieu?"}</TableCell>
            <TableCell>{user.createdAt?.toLocaleString()}</TableCell>
            <TableCell>{user.updatedAt?.toLocaleString()}</TableCell>
            <TableCell className="text-right">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost">
                    <Pencil className="size-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Perubahan Data Santri</DialogTitle>
                    <UserForm  user={user}/>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <DeleteUserButton userId={user.id} />
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}
