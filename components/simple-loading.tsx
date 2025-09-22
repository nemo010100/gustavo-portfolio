"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface SimpleLoadingProps {
  onComplete?: () => void
}

export default function SimpleLoading({ onComplete }: SimpleLoadingProps) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Inicializando...")
  const [showAvatar, setShowAvatar] = useState(false)

  const loadingSteps = [
    { progress: 0, text: "Inicializando..." },
    { progress: 20, text: "Carregando recursos..." },
    { progress: 40, text: "Preparando experiência..." },
    { progress: 60, text: "Otimizando performance..." },
    { progress: 80, text: "Finalizando..." },
    { progress: 100, text: "Pronto!" }
  ]

  useEffect(() => {
    console.log('SimpleLoading mounted!')
    
    let currentStep = 0
    
    const timer = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep]
        setProgress(step.progress)
        setLoadingText(step.text)
        
        if (step.progress >= 20 && !showAvatar) {
          setShowAvatar(true)
        }
        
        currentStep++
      } else {
        clearInterval(timer)
        setTimeout(() => {
          console.log('Loading complete!')
          onComplete?.()
        }, 1500)
      }
    }, 600)

    return () => clearInterval(timer)
  }, [onComplete, showAvatar])

  // Efeitos de partículas flutuantes
  const particleVariants = {
    animate: {
      y: [0, -100, 0],
      x: [0, 30, -30, 0],
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      rotate: [0, 180, 360],
    }
  }

  // Efeito de círculos concêntricos
  const circleVariants = {
    animate: {
      scale: [1, 2, 1],
      opacity: [0.8, 0.2, 0.8],
      rotate: [0, 360],
    }
  }

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden">
      {/* Background gradiente animado */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #0f172a 0%, #1e293b 25%, #0f172a 50%)",
            "radial-gradient(circle at 80% 50%, #1e293b 0%, #0f172a 25%, #1e293b 50%)",
            "radial-gradient(circle at 50% 20%, #0f172a 0%, #1e293b 25%, #0f172a 50%)",
            "radial-gradient(circle at 20% 50%, #0f172a 0%, #1e293b 25%, #0f172a 50%)",
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Partículas flutuantes */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#06b6d4" : "#8b5cf6",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(1px)",
            }}
            variants={particleVariants}
            animate="animate"
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Círculos concêntricos atrás do avatar */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute border border-blue-500/20 rounded-full"
            style={{
              width: `${100 + ring * 60}px`,
              height: `${100 + ring * 60}px`,
            }}
            variants={circleVariants}
            animate="animate"
            transition={{
              duration: 2 + ring * 0.5,
              repeat: Infinity,
              delay: ring * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* Avatar com efeitos */}
          <AnimatePresence>
            {showAvatar && (
              <motion.div
                initial={{ scale: 0, opacity: 0, rotateY: 180 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ 
                  duration: 1.2, 
                  ease: "easeOut",
                  type: "spring",
                  bounce: 0.4
                }}
                className="relative mx-auto mb-8"
              >
                {/* Glow effect atrás do avatar */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 rounded-full blur-xl animate-pulse" />
                
                {/* Avatar container */}
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 to-cyan-500 p-1 bg-gradient-to-r from-blue-500 to-cyan-500">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
                    <Image
                      src="/images/minha-foto.jpeg"
                      alt="Gustavo"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Efeito de scan */}
                <motion.div
                  className="absolute inset-0 border-2 border-cyan-400/60 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nome com efeito de typing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Gustavo
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-2 rounded-full"
              style={{ maxWidth: "200px" }}
            />
          </motion.div>

          {/* Progress bar com efeitos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-6"
          >
            <div className="relative w-80 max-w-sm mx-auto">
              {/* Background da progress bar */}
              <div className="h-3 bg-gray-800/80 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/50">
                {/* Progress fill com gradiente animado */}
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full relative"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* Efeito de brilho que se move */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>

              {/* Percentage com efeito neon */}
              <motion.div
                key={progress}
                initial={{ scale: 1.2, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center mt-4"
              >
                <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                  {progress}%
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Loading text com efeito de typing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center"
          >
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg text-gray-300 font-medium"
            >
              {loadingText}
            </motion.p>

            {/* Dots animados */}
            <div className="flex justify-center space-x-1 mt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Specs tech ao redor */}
          <div className="absolute inset-0 pointer-events-none">
            {["React", "Next.js", "TypeScript", "Tailwind"].map((tech, i) => (
              <motion.div
                key={tech}
                className="absolute text-xs text-gray-500 font-mono"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + i * 10}%`,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay com efeito de scan */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"
        animate={{
          y: ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}
