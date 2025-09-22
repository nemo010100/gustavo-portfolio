"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function HeroSectionStatic() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image - Full Screen */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/background-photo.jpg')`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          width: '100%',
          height: '100%'
        }}
      >
        {/* Overlay escuro para destacar o conteúdo */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content Layer - ZERO animações */}
      <motion.div 
        style={{ opacity, y }} 
        className="relative z-10 w-full h-full flex items-center justify-start pl-8 lg:pl-20"
      >
        <div className="max-w-2xl">
          {/* Título Principal - SEM animação */}
          <div className="mb-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              <span className="block text-white">
                DESENVOLVEDOR
              </span>
              <span className="block text-white">WEB</span>
            </h1>
          </div>

          {/* Subtítulo - SEM animação */}
          <div className="mb-8">
            <p className="text-xl lg:text-2xl text-gray-200 font-light">
              <span className="text-cyan-400 font-medium">Sites</span> • 
              <span className="text-green-400 font-medium ml-2">Automação</span> • 
              <span className="text-yellow-400 font-medium ml-2">Soluções</span>
            </p>
          </div>

          {/* Descrição - SEM animação */}
          <div className="mb-8">
            <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
              Criando experiências digitais incríveis e automatizando processos 
              para empresas que querem se destacar no digital.
            </p>
          </div>

          {/* CTA Button - SEM animação */}
          <div>
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              Vamos Conversar
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}


