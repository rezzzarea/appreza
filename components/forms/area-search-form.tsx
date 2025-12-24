'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/inputs/input'
import Button from '@/components/buttons/button copy'

export default function AreaSearchForm(){
    const [inputValue, setInputValue] = useState('')
    const router = useRouter()
  
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputValue.trim()) {
            router.push(`/area/${encodeURIComponent(inputValue.trim())}`)
        }
    }

    return(
        <form onSubmit={handleSubmit} className="mt-4">
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <Button type="submit" />
        </form>
    )
}