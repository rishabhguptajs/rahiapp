/**
 * @component WavyBackground
 * @description Renders a wavy background animation using a canvas element with customizable properties.
 */
"use client"
import { cn } from "../../lib/utils";
import React, { useEffect, useRef, useState } from "react"
import { createNoise3D } from "simplex-noise"

/**
 * WavyBackground component
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - Child elements to render on top of the canvas
 * @param {string} [props.className] - Additional class names for styling
 * @param {string} [props.containerClassName] - Additional class names for the container
 * @param {Array<string>} [props.colors] - Array of colors for the waves
 * @param {number} [props.waveWidth] - Width of the wave lines
 * @param {string} [props.backgroundFill] - Background color of the canvas
 * @param {number} [props.blur] - Blur effect applied to the canvas
 * @param {string} [props.speed] - Speed of the wave animation
 * @param {number} [props.waveOpacity] - Opacity of the wave
 * @returns {JSX.Element} The rendered wavy background component
 */
export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const noise = createNoise3D()
  let w, h, nt, i, x, ctx, canvas
  const canvasRef = useRef(null)

  /**
   * Determines the speed of the wave animation based on the provided speed prop.
   * @returns {number} The speed value for the animation
   */
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001
      case "fast":
        return 0.002
      default:
        return 0.001
    }
  }

  /**
   * Initializes the canvas and sets up the rendering context.
   */
  const init = () => {
    canvas = canvasRef.current
    ctx = canvas.getContext("2d")
    w = ctx.canvas.width = window.innerWidth
    h = ctx.canvas.height = window.innerHeight
    ctx.filter = `blur(${blur}px)`
    nt = 0
    window.onresize = function() {
      w = ctx.canvas.width = window.innerWidth
      h = ctx.canvas.height = window.innerHeight
      ctx.filter = `blur(${blur}px)`
    }
    render()
  }

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee"
  ]

  /**
   * Draws the wave on the canvas.
   * @param {number} n - The number of waves to draw
   */
  const drawWave = n => {
    nt += getSpeed()
    for (i = 0; i < n; i++) {
      ctx.beginPath()
      ctx.lineWidth = waveWidth || 50
      ctx.strokeStyle = waveColors[i % waveColors.length]
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100
        ctx.lineTo(x, y + h * 0.5) // adjust for height, currently at 50% of the container
      }
      ctx.stroke()
      ctx.closePath()
    }
  }

  let animationId

  /**
   * Renders the waves and updates the canvas at each animation frame.
   */
  const render = () => {
    ctx.fillStyle = backgroundFill || "black"
    ctx.globalAlpha = waveOpacity || 0.5
    ctx.fillRect(0, 0, w, h)
    drawWave(5)
    animationId = requestAnimationFrame(render)
  }

  useEffect(() => {
    init()
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    // I'm sorry but i have got to support it on safari.
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    )
  }, [])

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {})
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  )
}
