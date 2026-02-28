'use client'

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

    const onProgress = (percent: number) => {
      if (percentRef.current) {
        percentRef.current.innerText = percent.toString()
      }
    }

    const onLoaded = () => {
      if (loaderRef.current) {
        loaderRef.current.style.opacity = '0'
        setTimeout(() => {
          setIsReady(true)
        }, 500)
      }
    }

    const destroy = Scene(containerRef.current, onProgress, onLoaded)

    return () => {
      if (destroy) destroy()
    }
  }, [])

  return (
    <>
      {!isReady && <LoadingScreen ref={loaderRef}
																	percentRef={percentRef} />}
      <div ref={containerRef}
					 className="w-full h-screen bg-black overflow-hidden"/>
    </>
  )
}

export default View