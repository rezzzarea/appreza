import React from 'react'

function Input() {
  return (
    // border di figma bukan border di css tp outline
    /*
      border: menambah jarak lebar border keluar
      outline: menambah jarak lebar border kedalam
    */
    <div>
      <input className='outline-4 outline-fuchsia-500 rounded-3xl' type="text" name="" id="" placeholder='Put any name of city / country in the world' />
    </div>
  )
}

export default Input
