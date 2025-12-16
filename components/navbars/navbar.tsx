import React from 'react'
import { ModeToggle } from '../buttons/mode-toggle'

function Navbar() {
  return (
    <div className='flex justify-between items-center w-full px-5 py-[10px] bg-[#d1c4d7] dark:bg-[#403842]'>
      <h1>Logo</h1>
      <ModeToggle />
    </div>
  )
}

export default Navbar
