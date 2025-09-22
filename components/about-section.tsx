"use client"

import { useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { TrendingUp, Building, Coins, BarChart } from "lucide-react"
import Image from "next/image"
import RevealAnimation from "./reveal-animation"

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const listItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  }

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto" ref={ref}>
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-heading font-bold mb-4"
            >
              Sobre <span className="text-gradient">Mim</span>
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"
            ></motion.div>
          </motion.div>

          <div className="split-layout">
            <RevealAnimation direction="left" delay={0.2}>
              <div className="glass card-hover p-6 md:p-8 h-full">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500/30 flex-shrink-0">
                    <Image
                      src="/images/minha-foto.jpeg"
                      alt="Gustavo"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold mb-2">
                      Quem Eu Sou
                    </h3>
                    <p className="text-gray-300">
                      Sou Gustavo, tenho 18 anos e trabalho com criação de sites e
                      marketing digital. Apaixonado por tecnologia e resultados,
                      ajudo empresas a crescerem no digital.
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">
                  Com experiência em desenvolvimento web, tráfego pago e tráfego
                  orgânico, trabalho para criar soluções que geram resultados
                  reais para os negócios.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Criação de Sites", "Tráfego Pago", "Tráfego Orgânico", "Marketing Digital"].map(
                    (skill, index) => (
                      <motion.span
                        key={index}
                        variants={listItemVariants}
                        custom={index}
                        className="px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      >
                        {skill}
                      </motion.span>
                    )
                  )}
                </div>
              </div>
            </RevealAnimation>

            <RevealAnimation direction="right" delay={0.4}>
              <div className="neomorphic p-6 md:p-8 h-full">
                <h3 className="text-xl md:text-2xl font-heading font-bold mb-4">
                  Minha Experiência
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="inline-block mr-3 mt-1">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                    </span>
                    <span>
                      <strong className="text-blue-500">Sites Responsivos:</strong>{" "}
                      Desenvolvo sites modernos e otimizados que funcionam
                      perfeitamente em todos os dispositivos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block mr-3 mt-1">
                      <Building className="w-4 h-4 text-cyan-500" />
                    </span>
                    <span>
                      <strong className="text-cyan-500">Tráfego Pago:</strong>{" "}
                      Experiência em campanhas no Google Ads e Facebook Ads para
                      gerar leads qualificados
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block mr-3 mt-1">
                      <Coins className="w-4 h-4 text-yellow-500" />
                    </span>
                    <span>
                      <strong className="text-yellow-500">SEO e Conteúdo:</strong>{" "}
                      Trabalho com otimização para buscadores e estratégias de
                      tráfego orgânico
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block mr-3 mt-1">
                      <BarChart className="w-4 h-4 text-blue-500" />
                    </span>
                    <span>
                      <strong className="text-blue-500">Resultados Práticos:</strong>{" "}
                      Foco em soluções que geram resultados concretos e
                      mensuráveis para o crescimento do negócio
                    </span>
                  </li>
                </ul>
              </div>
            </RevealAnimation>
          </div>

          <RevealAnimation direction="up" delay={0.6}>
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={itemVariants}
              className="mt-12 text-center"
            >
              <p className="text-center text-sm italic">
                "Aos 18 anos, combinando energia jovem com conhecimento técnico
                para entregar soluções digitais eficazes."
              </p>
            </motion.div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  )
}