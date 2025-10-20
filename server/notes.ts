"use server"

import { db } from "@/db/drizzle"
import { InsertNote, notes } from "@/db/schema"
import { auth } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"


export const createNote = async(values:InsertNote)=>{
    try {
        await db.insert(notes).values(values)
        return {success:true,message:"Note created successfully"}
    } catch (error) {
        return {success:false,message:"qoddarullah, error membuat note"}
    }
}

// function API dibawah ini g pakai parameter, krn dia hanya butuh tau siapa user yg lg login, lalu dia akan menampilkan semua notebook milik si user tsb, beda halnya dgn createNotebook yg butuh banyak values utk diinsert ke db
export const getNoteById = async(id:string)=>{
    try {
        const note = await db.query.notes.findFirst({
            where: eq(notes.id, id)
        })
        return {success:true, note}
    } catch (error) {
        return { success: false, message: "qoddarullah note tdk dapat tertampilkan" }
    }
}

// function API utk mengupdate data note, dia butuh id note yg mau diupdate, dan values apa yg mau diupdate
export const updateNote = async(id:string, values:Partial<InsertNote>)=>{
    try {
        await db.update(notes).set(values).where(eq(notes.id, id))
        return {success:true,message:"Note updated successfully"}
    } catch (error) {
        return {success:false,message:"qoddarullah error update note"}
    }
}

// function API utk menghapus data note, dia butuh id note yg mau dihapus
export const deleteNote = async(id:string)=>{
    try {
        await db.delete(notes).where(eq(notes.id, id))
        return {success:true,message:"Note deleted successfully"}
    } catch (error) {
        return {success:false,message:"astaghfirullah error delete note"}
    }
}
