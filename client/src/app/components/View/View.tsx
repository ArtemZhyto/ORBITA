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
    if (!containerRef.current || !loaderRef.current) return

    const progressLine = document.getElementById('progress-line') as HTMLElement
    const percentText = document.getElementById('percent-text') as HTMLElement

    const destroy = Scene(containerRef.current, loaderRef.current, progressLine, percentText)

    return () => destroy()
  }, [])

  return (
    <>
      <LoadingBar ref={loaderRef}/>
      <div ref={containerRef} className="w-full h-screen bg-black"/>
    </>
  )
}

export default View