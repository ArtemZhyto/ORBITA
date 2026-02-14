'use client'

//@ Modules
import { forwardRef } from 'react'

const LoadingBar = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref}
         className="-mt-[75px] fixed inset-0 flex flex-col items-center justify-center bg-black z-[1000] transition-opacity duration-500">

      <style>{`
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0) }
          40% { transform: translateY(-5px) }
        }

        .logo-img {
          user-select: none;
          pointer-events: none;
        }

        .dot {
          display: inline-block;
          animation: dotBounce 1.4s infinite ease-in-out;
        }

        .dot-1 { animation-delay: 0s; }
        .dot-2 { animation-delay: 0.2s; }
        .dot-3 { animation-delay: 0.4s; }
      `}</style>

      <div className="flex flex-col items-center">
        <img src="/images/web-app-manifest-512x512.png"
          	 alt="ORBITA"
             className="w-64 h-64 object-contain logo-img"/>

        <div className="-mt-7 flex flex-col items-center relative z-10">
          <h1 className="text-white mb-2 text-3xl tracking-[6px] flex items-baseline uppercase font-extralight opacity-80">
            LOADING THE UNIVERSE
            <span className="flex ml-1">
              <span className="dot dot-1 mr-[2px]">.</span>
              <span className="dot dot-2 mr-[2px]">.</span>
              <span className="dot dot-3">.</span>
            </span>
          </h1>

          <div className="text-white text-2xl font-mono tracking-widest font-light">
            <span id="percent-text">0</span>%
          </div>
        </div>
      </div>
    </div>
  )
})

export default LoadingBar