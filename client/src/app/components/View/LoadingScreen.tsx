'use client'

//@ Modules
import { forwardRef, RefObject } from 'react'

interface Props {
  percentRef: RefObject<HTMLSpanElement | null>
}

const LoadingScreen = forwardRef<HTMLDivElement, Props>(({ percentRef }, ref) => {
  return (
    <div ref={ref}
         className="fixed inset-0 flex flex-col items-center justify-center bg-black z-[1000] transition-opacity duration-500">

      <div className="flex flex-col items-center">
        <img src="/images/web-app-manifest-512x512.png"
						 alt="LOGO"
						 className="w-64 h-64 object-contain select-none pointer-events-none"/>

        <div className="-mt-7 flex flex-col items-center">
          <h1 className="text-white mb-2 text-3xl tracking-[6px] flex items-baseline uppercase font-extralight opacity-80">
            LOADING THE UNIVERSE
            <span className="flex ml-1">
              <span className="dot dot-1 mr-[2px]">.</span>
              <span className="dot dot-2 mr-[2px]">.</span>
              <span className="dot dot-3">.</span>
            </span>
          </h1>

          <div className="text-white text-2xl font-mono tracking-widest font-light">
            <span ref={percentRef}>0</span>%
          </div>
        </div>
      </div>
    </div>
  )
})

export default LoadingScreen