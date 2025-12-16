'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/inputs/input'
import Button from '@/components/buttons/button'

export default function HalamanUtamaArea(){
    const [inputValue, setInputValue] = useState('')
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputValue.trim()) {
            router.push(`/area/${encodeURIComponent(inputValue.trim())}`)
        }
    }

    return(
        <div>
            <div>Bismillah, ini halaman utama area nanti setelah link ini kasih / terus ketik nama wilayah manapun di dunia ini, insya Allah kita akan hadirkan suhu, waktu, kecepatan angin, dan kordinat wilayahnya</div>
            <form onSubmit={handleSubmit} className="mt-4">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button type="submit" />
            </form>
        </div>
    )
}