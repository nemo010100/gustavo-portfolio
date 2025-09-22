"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  onComplete?: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Carregando recursos...")
  const name = "Gustavo"

  useEffect(() => {
    let isMounted = true
    
    const preloadResources = async () => {
      try {
        // Lista de recursos críticos para carregar
        const imagesToLoad = [
          '/images/background-photo.jpg',
          '/images/minha-foto.jpeg'
        ]
        
        console.log('Starting loading process...')
        
        const fontsToLoad = [
          'Inter',
          'Space Grotesk'
        ]
        
        let progress = 0
        const totalSteps = imagesToLoad.length + fontsToLoad.length + 3 // +3 para outros recursos
        
        // Carregar imagens críticas
        setLoadingText("Carregando imagens...")
        for (const imageSrc of imagesToLoad) {
          if (!isMounted) return
          
          await new Promise<void>((resolve) => {
            const img = document.createElement('img')
            img.onload = () => {
              progress++
              if (isMounted) {
                setLoadingProgress((progress / totalSteps) * 100)
              }
              resolve()
            }
            img.onerror = () => {
              progress++
              if (isMounted) {
                setLoadingProgress((progress / totalSteps) * 100)
              }
              resolve() // Continue mesmo com erro
            }
            img.src = imageSrc
          })
          
          // Pequeno delay para UX
          await new Promise<void>(resolve => setTimeout(resolve, 200))
        }
        
        // Verificar carregamento de fontes
        setLoadingText("Carregando fontes...")
        for (const fontFamily of fontsToLoad) {
          if (!isMounted) return
          
          try {
            await document.fonts.load(`1em ${fontFamily}`)
          } catch (e) {
            console.warn(`Font ${fontFamily} failed to load`)
          }
          
          progress++
          if (isMounted) {
            setLoadingProgress((progress / totalSteps) * 100)
          }
          await new Promise<void>(resolve => setTimeout(resolve, 150))
        }
        
        // Simular carregamento de outros recursos críticos
        setLoadingText("Inicializando componentes...")
        await new Promise<void>(resolve => setTimeout(resolve, 300))
        progress++
        if (isMounted) setLoadingProgress((progress / totalSteps) * 100)
        
        setLoadingText("Preparando animações...")
        await new Promise<void>(resolve => setTimeout(resolve, 200))
        progress++
        if (isMounted) setLoadingProgress((progress / totalSteps) * 100)
        
        setLoadingText("Finalizando...")
        await new Promise<void>(resolve => setTimeout(resolve, 300))
        progress++
        if (isMounted) setLoadingProgress((progress / totalSteps) * 100)
        
        // Aguardar um pouco para mostrar 100%
        await new Promise<void>(resolve => setTimeout(resolve, 500))
        
        if (isMounted) {
          console.log('Loading process completed!')
          onComplete?.()
        }
        
      } catch (error) {
        console.error('Error during loading:', error)
        if (isMounted) {
          setLoading(false)
          onComplete?.()
        }
      }
    }
    
    preloadResources()
    
    return () => {
      isMounted = false
    }
  }, [onComplete])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, scale: 0.8 },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  const progressVariants = {
    hidden: { width: "0%" },
    visible: { width: "100%" },
  }

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? "#3b82f6" : "#06b6d4",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          <div className="flex flex-col items-center justify-center z-10 relative">
            {/* Avatar */}
            <motion.div className="mb-6" variants={itemVariants}>
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/50 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
                <Image
                  src="/images/minha-foto.jpeg"
                  alt="Gustavo"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover relative z-10"
                  priority
                />
              </div>
            </motion.div>

            {/* Name */}
            <motion.div className="mb-8" variants={itemVariants}>
              <h1 className="text-4xl md:text-6xl font-heading font-bold">
                {name.split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    variants={letterVariants}
                    transition={{
                      delay: index * 0.1,
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Progress Bar */}
            <motion.div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4" variants={itemVariants}>
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </motion.div>

            {/* Progress Percentage */}
            <motion.div className="text-xs text-blue-400 mb-2" variants={itemVariants}>
              {Math.round(loadingProgress)}%
            </motion.div>

            {/* Loading Text */}
            <motion.div
              className="text-sm text-gray-400 text-center"
              variants={itemVariants}
            >
              {loadingText}
            </motion.div>
          </div>

          {/* Background effects */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1),transparent_70%)]" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 blur-3xl" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

                  width={96}
                  height={96}
                  className="w-full h-full object-cover relative z-10"
                  priority
                />
              </div>
            </motion.div>

            {/* Name */}
            <motion.div className="mb-8" variants={itemVariants}>
              <h1 className="text-4xl md:text-6xl font-heading font-bold">
                {name.split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    variants={letterVariants}
                    transition={{
                      delay: index * 0.1,
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Progress Bar */}
            <motion.div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4" variants={itemVariants}>
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </motion.div>

            {/* Progress Percentage */}
            <motion.div className="text-xs text-blue-400 mb-2" variants={itemVariants}>
              {Math.round(loadingProgress)}%
            </motion.div>

            {/* Loading Text */}
            <motion.div
              className="text-sm text-gray-400 text-center"
              variants={itemVariants}
            >
              {loadingText}
            </motion.div>
          </div>

          {/* Background effects */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1),transparent_70%)]" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 blur-3xl" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
