"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ScrollEffects() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const { scrollYProgress } = useScroll()
  
  // Parallax para estrelas
  const starsY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const starsOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.4, 0.1])

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", updateScrollProgress, { passive: true })
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  // Gerar estrelas otimizadas (apenas 15)
  const stars = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
  }))

  return (
    <>
      {/* Barra de progresso do scroll */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 origin-left z-50"
        style={{
          scaleX: scrollProgress / 100,
        }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.1 }}
      />

      {/* Indicador de progresso circular */}
      <motion.div
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full border-2 border-gray-700 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: scrollProgress > 5 ? 1 : 0,
          scale: scrollProgress > 5 ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-gray-700"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <motion.path
            className="text-cyan-400"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            style={{
              strokeDasharray: "100",
              strokeDashoffset: 100 - scrollProgress,
            }}
            transition={{ duration: 0.1 }}
          />
        </svg>
        <span className="absolute text-xs font-bold text-cyan-400">
          {Math.round(scrollProgress)}
        </span>
      </motion.div>

      {/* Estrelas parallax otimizadas */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ y: starsY, opacity: starsOpacity }}
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-cyan-400/30"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + star.delay,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </>
  )
}
