import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { fetchDataQuran } from "@/lib/quran"
import { getUsers } from "@/server/users"
import TombolHapusData from "../buttons/tombol-hapus-data"



export default async function TabelAdmin() {
    const users = await getUsers() //ambil data dari tabel user di neon
    // proses penerjemahan nomor surat dari DB menjadi namalatin dari API
    const dataQuran = await fetchDataQuran() // API yg akan menerjemahkan nomor dari database menjadi tulisan nama surat
    const pencariNamaSurat = (nomorSurat:number) => {
        if (nomorSurat === 0){
            return "qodarullah data nomor surat tidak ada"
        }
        const namaSurat = dataQuran.find((nomerSuratDariAPI) => nomerSuratDariAPI.nomor === nomorSurat)
        return namaSurat ? namaSurat.namaLatin:0
    }

    return (
    <Table>
    <TableCaption>Aplikasi Tahfizh Imam Nafi</TableCaption>
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
                <TableCell>{user.ayat}</TableCell>
                <TableCell>{user.createdAt?.toLocaleString()}</TableCell>
                <TableCell>{user.updatedAt?.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                    <TombolHapusData />
                </TableCell>
            </TableRow>
        ))}

    </TableBody>
    </Table>
  )
}


