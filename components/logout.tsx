"use client"
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Loader2, LogOutIcon } from 'lucide-react'
import { toast } from 'sonner'
export default function LogOut() {
    const [isLoading,setIsLoading] = useState(false) //setelan sensai loading posisi awal false / mati
    const router = useRouter()
    const handleLogout = async()=>{
        setIsLoading(true) 
        try {
            await authClient.signOut()
            toast.success("antum sudah logout, terima kasih sudah mampir, jazaakallaahu khayra")
            router.push("/")
        } catch (error) {
            toast.error("gagal logout, silakan coba lagi")
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
    <Button variant={'destructive'} onClick={handleLogout} disabled={isLoading}>
        {/* versi lawas 1.0 tanpa sensasi loading */}
        {/* Logout <LogOutIcon className='size-4' /> */}
        {isLoading ? (<Loader2 className="size-4 animate-spin" />) : 
        <div className='flex gap-2'>
           <span>Log Out</span>
            <LogOutIcon />
        </div>
        }        
    </Button>
  )
}
