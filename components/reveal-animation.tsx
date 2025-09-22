"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface RevealAnimationProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right" | "scale" | "rotate"
  delay?: number
  duration?: number
  className?: string
}

export default function RevealAnimation({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
}: RevealAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1,
    margin: "0px 0px -100px 0px"
  })

  const variants = {
    hidden: {
      opacity: 0,
      ...(direction === "up" && { y: 50 }),
      ...(direction === "down" && { y: -50 }),
      ...(direction === "left" && { x: 50 }),
      ...(direction === "right" && { x: -50 }),
      ...(direction === "scale" && { scale: 0.8 }),
      ...(direction === "rotate" && { rotateY: 45, scale: 0.9 }),
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
