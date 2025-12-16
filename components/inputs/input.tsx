import React from 'react'

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

function Input({ value, onChange, placeholder = 'Put any name of city / country in the world' }: InputProps) {
  return (
    // border di figma bukan border di css tp outline
    /*
      border: menambah jarak lebar border keluar
      outline: menambah jarak lebar border kedalam
    */
    <div>
      <input
        className='outline-4 outline-fuchsia-500 rounded-3xl'
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
