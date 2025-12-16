import React from 'react'

function Title() {
  return (
    /*
      tracking = letter-spacing = jarak antar huruf
      letter-spacing -2% setara tracking-[-0.02em] di tailwind
    */ 
    <div>
      <h2 className='font-bold text-[27px] tracking-[-0.02em] text-center'>Global Data Explorer</h2>
      <p className='text-center'>Find real time, currency, geo-location, and weather around the world</p>
    </div>
  )
}

export default Title
