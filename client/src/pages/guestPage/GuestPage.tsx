import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useRef, useState } from 'react'
import animationData from '../taskPage/Animation - 1744053915834.json'

export const GuestPage: React.FC = () => {
  return (
    <div className="grid grid-cols-[1fr_1fr] overflow-hidden place-content-center">
      <div className="py-[10px] px-[24px] flex flex-col flex-wrap place-content-center w-full">
        Hallo
      </div>
      <div className="relative py-[10px] px-[24px]">
        <Player
          src={animationData}
          autoplay
          loop
          style={{ height: '500px', width: '500px' }}
        />
      </div>
    </div>
  )
}
function useAppDispatch() {
  throw new Error('Function not implemented.')
}
