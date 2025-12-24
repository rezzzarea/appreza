import React from 'react'
import ModularButton from './ModularButton'
interface AreaButtonProps{
  type?: "button" | "submit";
}
function AreaButton({type}:AreaButtonProps) {
  return (
    <ModularButton className="bg-red-400 px-4 py-1 rounded-2xl">
      Klik disini
    </ModularButton>
  )
}

export default AreaButton
