"use server"

import { db } from "@/db/drizzle"
import { InsertNotebook, notebooks } from "@/db/schema"
import { auth } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"

// fungsinya u/ menjalankan API di server 

/* 
wajib ingat setiapkali buat function di ts, misal disini kita mau nambah data notebook, harus kita tentukan:
pertama: tipe data di parameter function nya:
    yaitu adalah tipe data InsertNotebook yg mana ia akan berpatokan kepada tipe data di notebooks sebagaimana tertulis di schema supaya typescript tau tipe data apa yg harus kita olah didalam function createNotebook ini
*/
export const createNotebook = async(values:InsertNotebook)=>{
    try {
        await db.insert(notebooks).values(values)
        return {success:true,message:"Notebook created successfully"}
    } catch (error) {
        return {success:false,message:"astaghfirullah, error"}
    }
}

// function API dibawah ini g pakai parameter, krn dia hanya butuh tau siapa user yg lg login, lalu dia akan menampilkan semua notebook milik si user tsb, beda halnya dgn createNotebook yg butuh banyak values utk diinsert ke db
export const getNotebooks = async()=>{
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        const userId = session?.user?.id
        if(!userId){
            return {success:false, message:"anda belum login"}
        }
        const notebooksByUser = await db.query.notebooks.findMany({
            where: eq(notebooks.userId, userId),
            with: {
                notebook: true //ana cek nanti apakah notebook / notes
                // notes: true
            }
        })
        return {success:true, notebooks: notebooksByUser}
    } catch (error) {
        return { success: false, message: "Error fetching notebooks" }
    }
}

// function API utk mengupdate data notebook, dia butuh id notebook yg mau diupdate, dan values apa yg mau diupdate
export const updateNotebook = async(id:string, values:Partial<InsertNotebook>)=>{
    try {
        await db.update(notebooks).set(values).where(eq(notebooks.id, id))
        return {success:true,message:"Notebook updated successfully"}
    } catch (error) {
        return {success:false,message:"qoddarullah error update notebook"}
    }
}

// function API utk menghapus data notebook, dia butuh id notebook yg mau dihapus
export const deleteNotebook = async(id:string)=>{
    try {
        await db.delete(notebooks).where(eq(notebooks.id, id))
        return {success:true,message:"Notebook deleted successfully"}
    } catch (error) {
        return {success:false,message:"astaghfirullah error delete notebook"}
    }
}
