"use server"

import { db } from "@/db/drizzle"
import { InsertNotebook, notebooks } from "@/db/schema"
import { auth } from "@/lib/auth"
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

export const getNotebooks = async()=>{
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        const userId = session?.user?.id
        if(!userId){
            return {success:false, message:"anda belum login"}
        }

        // const notebooksByUser = await db.query.notebooks.findMany({

        // }) 

    } catch (error) {
        
    }
}