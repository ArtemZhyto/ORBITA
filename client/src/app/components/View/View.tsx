'use client'

//@ Modules
import { useEffect, useRef } from "react"

//@ Components
import Scene from "./elements/scene"
import LoadingBar from "./LoadingBar"

const View = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const destroy = Scene(containerRef.current)

    return () => {
      if (destroy) destroy()
    }
  }, [])

  return (
    <>
      {/* <LoadingBar ref={loaderRef}/> */}
      <div ref={containerRef} className="w-full h-screen bg-black overflow-hidden"/>
    </>
  )
}

export default View