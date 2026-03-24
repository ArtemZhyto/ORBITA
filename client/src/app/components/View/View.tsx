'use client'

//@ Styles
import './View.scss'

//@ Modules
import { useEffect, useRef, useState } from "react"

//@ Components
import Scene from "./elements/scene"
import LoadingScreen from "./LoadingScreen"

const View = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    let isMounted = true
    let destroyFn: (() => void) | undefined
    let targetPercent = 0
    let currentPercent = 0
    let rafId: number

    const updateSmoothProgress = () => {
      if (currentPercent < targetPercent) {
        currentPercent += 1.5

        if (percentRef.current) percentRef.current.innerText = Math.floor(currentPercent).toString()
      }

      rafId = requestAnimationFrame(updateSmoothProgress)
    }

    updateSmoothProgress()

    const onProgress = (percent: number) => targetPercent = percent

    const onLoaded = () => {
      targetPercent = 100

      const checkInterval = setInterval(() => {
        if (currentPercent >= 99) {
          clearInterval(checkInterval)

          setTimeout(() => {
            if (loaderRef.current) {
              loaderRef.current.style.opacity = '0'

              setTimeout(() => { if (isMounted) setIsReady(true) }, 500)
            }
          }, 500)
        }
      }, 50)
    }

    const init = async () => {
      await new Promise(resolve => setTimeout(resolve, 300))

      if (!isMounted) return

      const cleanup = await Scene(containerRef.current!, onProgress, onLoaded)

      if (!isMounted) cleanup()
      else destroyFn = cleanup
    }

    init()

    return () => {
      isMounted = false
      cancelAnimationFrame(rafId)

      if (destroyFn) destroyFn()
    }
  }, [])

  return (
    <>
      {!isReady && <LoadingScreen ref={loaderRef}
																	percentRef={percentRef}/>}
      <div ref={containerRef}
        	 className="View bg-black"/>
    </>
  )
}

export default View