"use server"
import { db } from "@/db/drizzle"
import { User, user } from "@/db/schema"
import { auth } from "@/lib/auth"
import { error } from "console"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
type TahfizhDataInput = {
    id:string
    username:string 
    email:string 
    password:string
    surat:number 
    ayat:number
}
// api get / function yg kita panggil u/ hhtp method get (menampilkan isi db)
export async function getUsers() {
    try{
        const allUsers = await db.select().from(user)
        return allUsers
    } catch (error){
        console.error(error)
        throw error
    }
}
// api create u/ membuat data baru ke table / database
/* 
export async function createUser(userData:Omit<User,"id"|"createdAt"|"updatedAt">) {
*/
export async function createUser(userData:Omit<TahfizhDataInput,"id">) {
    try{
        await db.insert(user).values({
            ...userData,
            id:crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            emailVerified:false,
            image:"",
            name:"",
        })
        revalidatePath('/users')
    } catch (error){
        console.error(error)
        return{error:"pembuatan user baru gagal"}
    }
}
// api update u/ mengupdate data yg telah ada ke table / database
/*
// export async function updateUser(user:Omit<User,"createdAt"|"updatedAt">) {
*/
export async function updateUser(userData:TahfizhDataInput) {
    try{
        // await db.update(users).set(user).where(eq(users.id,user.id))
        await db.update(user).set({
            username:userData.username,
            name:userData.username,
            email:userData.email,
            password:userData.password,
            surat:userData.surat,
            ayat:userData.ayat,
            updatedAt: new Date(),
        }).where(eq(user.id,userData.id))
        revalidatePath('/users')
    } catch (error){
        console.error(error)
        return{error:"pembuatan user baru gagal"}
    }
}
// api delete u/ menghapus data yg telah ada di table / database
export async function deleteUser(id:string) {
    try{
        // dr db table user di neon delete dimana id nya sama (equal dg id yg kita pilih)
        await db.delete(user).where(eq(user.id,id))
        revalidatePath('/users')
    } catch (error){
        console.error(error)
        return{error:"penghapusan data user qadarullah tidak berhasil"}
    }
}
// api u/ fitur sign-in ke aplikasi fullstack
export const signInUser = async (email:string,password:string) => {
    try {
        await auth.api.signInEmail({
            body:{
                email,
                password
            }
        })
        // pesan custom di toast bila api login berhasil terhubung ke db
        return {success:true,message:"berhasil login alhamdulillah"}
    } catch (error) {
        const e = error as Error 
        return {success:false,message:e.message || "astaghfirullah login nya gagal"}
    }
}
// api u/ fitur sign-up ke database via better auth
export const signUpUser = async (email:string,password:string,name:string) => {
    try {
        await auth.api.signUpEmail({
            body:{
                email,
                password,
                name
            }
        })
        return {success:true,message:"data berhasil terdaftarkan, alhamdulillah"}
    } catch (error) {
        const e = error as Error
        return {success:false,message:e.message || "astaghfirullah sign-up nya gagal"}
    }
}




// export const signUpUser = async (email: string, password: string, name: string) => {
//     try {
//         const authResponse = await auth.api.signUpEmail({
//             body: {
//             email,
//             password,
//             name,
//             },
//         });

//         await db.insert(user).values({
//             id: authResponse.user.id,
//             email,
//         }).onConflictDoUpdate({
//             target: user.email, 
//             set: {
//                 username: name,
//                 surat: 1,
//                 ayat: 1,
//             },
//         });
  
//       return { success: true, message: "Data berhasil terdaftarkan, alhamdulillah" };
//     } catch (error) {
//       const e = error as Error;
//       return { success: false, message: e.message || "Astaghfirullah sign-up nya gagal" };
//     }
// };
  

/*
ana berikan kelaluasaan manatau antum mau combine betterauth /tidaknya
manayau antum maunya passwordny kesimpen boleh aja udh prnh antum cobain tp ana g rekomen
bisa aja tp ahsan itu hak keamanan mereka di aplikasi antum
kecuali yg sifatnya antum buatkan krn premium 
*/