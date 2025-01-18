/**
 * @component InfiniteMovingCards
 * @description Renders an infinite scrolling card component that displays quotes and associated information.
 */
"use client"

import { cn } from "../../lib/utils"
import React, { useEffect, useState } from "react"

/**
 * InfiniteMovingCards component
 * @param {Object} props - Component properties
 * @param {Array} props.items - Array of items to display in the cards
 * @param {string} [props.direction="left"] - Direction of the scrolling animation
 * @param {string} [props.speed="fast"] - Speed of the scrolling animation
 * @param {boolean} [props.pauseOnHover=true] - Whether to pause the animation on hover
 * @param {string} [props.className] - Additional class names for styling
 * @returns {JSX.Element} The rendered infinite moving cards component
 */
export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className
}) => {
  const containerRef = React.useRef(null)
  const scrollerRef = React.useRef(null)

  useEffect(() => {
    addAnimation()
  }, [])

  const [start, setStart] = useState(false)

  /**
   * Adds animation to the scrolling cards by duplicating items and setting direction and speed.
   */
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }

  /**
   * Sets the direction of the scrolling animation based on the direction prop.
   */
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        )
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        )
      }
    }
  }

  /**
   * Sets the speed of the scrolling animation based on the speed prop.
   */
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s")
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s")
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s")
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900)"
            }}
            key={item.name}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className=" relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
                    {item.name}
                  </span>
                  <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  )
}
