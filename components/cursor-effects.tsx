"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CursorEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: string }>>([])

  useEffect(() => {
    let trailId = 0
    
    const updateMousePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)
      setIsVisible(true)

      // Adicionar trail otimizado (máximo 8 pontos)
      setTrails(prev => {
        const newTrail = { ...newPosition, id: `trail-${trailId++}` }
        const updated = [newTrail, ...prev.slice(0, 7)]
        return updated
      })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {/* Trail de partículas */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: trail.x - 2,
            top: trail.y - 2,
            background: `linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6)`,
            filter: "blur(0.5px)",
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ 
            opacity: 0, 
            scale: 0.2,
            x: Math.random() * 20 - 10,
            y: Math.random() * 20 - 10,
          }}
          transition={{ 
            duration: 0.6,
            ease: "easeOut",
            delay: index * 0.02
          }}
        />
      ))}

      {/* Cursor principal */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        {/* Anel externo */}
        <motion.div
          className="w-5 h-5 border-2 border-cyan-400/60 rounded-full"
          animate={{
            scale: isClicking ? 1.5 : 1,
            borderColor: isClicking ? "#8b5cf6" : "#06b6d4",
          }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Ponto central */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            backgroundColor: isClicking ? "#8b5cf6" : "#06b6d4",
          }}
        />
      </motion.div>
    </div>
  )
}
