import React from 'react'

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

function Button({ onClick, children = 'Search', type = 'button' }: ButtonProps) {
  return (
    <div>
      <button className='bg-blue-800 rounded-2xl' onClick={onClick} type={type}>
        {children}
      </button>
    </div>
  )
}

export default Button
