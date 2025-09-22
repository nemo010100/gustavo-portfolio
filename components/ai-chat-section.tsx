"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Send, Bot, User, Sparkles, RefreshCw } from "lucide-react"
import Image from "next/image"

// Predefined chat messages
const initialMessages = [
  {
    role: "assistant",
    content: "👋 Olá! Sou o Gustavo AI, seu assistente virtual. Pergunte sobre minha experiência de trabalho ou habilidades!",
  },
]

const experienceResponses = [
  {
    role: "assistant",
    content: `Gustavo tem 18 anos e trabalha com criação de sites e marketing digital:

**Desenvolvedor Web** (2023-Presente)
• Criação de sites responsivos e modernos
• Desenvolvimento de soluções digitais eficazes
• Foco em resultados práticos para negócios

**Marketing Digital** (2023-Presente)
• Tráfego pago (Google Ads, Facebook Ads)
• Tráfego orgânico e SEO
• Estratégias de crescimento digital

Com energia jovem e conhecimento técnico, ele entrega soluções digitais que geram resultados reais.`,
  },
]

const skillsResponses = [
  {
    role: "assistant",
    content: `Gustavo se especializa em:

**Desenvolvimento Web** - Criação de sites modernos e responsivos
**Marketing Digital** - Estratégias de crescimento online
**Tráfego Pago** - Campanhas no Google Ads e Facebook Ads
**SEO e Conteúdo** - Otimização para buscadores
**Automação** - Soluções que otimizam processos

Ele é proficiente com tecnologias como React, Next.js, JavaScript, Python e várias ferramentas de marketing digital.`,
  },
]

const projectResponses = [
  {
    role: "assistant",
    content: `Gustavo já desenvolveu vários projetos inovadores:

**Sites Responsivos** - Plataformas modernas e otimizadas
**Sistemas de Automação** - Soluções que otimizam processos
**Campanhas de Marketing** - Estratégias que geram leads qualificados
**Soluções Digitais** - Ferramentas que impulsionam negócios

Cada projeto demonstra sua expertise em criar soluções digitais eficazes e focadas em resultados.`,
  },
]

// Rich text formatting function
const formatMessage = (content: string) => {
  // Convert **text** to bold
  let formatted = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

  // Convert bullet points to proper list items
  formatted = formatted.replace(/^• (.+)$/gm, "<li>$1</li>")

  // Wrap consecutive list items in ul tags
  formatted = formatted.replace(/(<li>.*<\/li>\s*)+/gs, "<ul>$&</ul>")

  // Convert line breaks to proper spacing
  formatted = formatted.replace(/\n\n/g, "<br><br>")
  formatted = formatted.replace(/\n/g, "<br>")

  return formatted
}

export default function AIChatSection() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatMessagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const controls = useAnimation()

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    setTimeout(() => {
      let response
      const lowercaseInput = input.toLowerCase()

      if (lowercaseInput.includes("experiência") || lowercaseInput.includes("trabalho") || lowercaseInput.includes("emprego")) {
        response = experienceResponses[0]
      } else if (lowercaseInput.includes("habilidade") || lowercaseInput.includes("sabe") || lowercaseInput.includes("faz")) {
        response = skillsResponses[0]
      } else if (
        lowercaseInput.includes("projeto") ||
        lowercaseInput.includes("portfolio") ||
        lowercaseInput.includes("construir")
      ) {
        response = projectResponses[0]
      } else {
        response = {
          role: "assistant",
          content:
            "Posso falar sobre a experiência de trabalho do Gustavo, habilidades, projetos ou serviços específicos como desenvolvimento web, marketing digital, tráfego pago, SEO e automação. O que você gostaria de saber?",
        }
      }

      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    const userMessage = { role: "user", content: question }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      let response

      if (question.includes("experiência")) {
        response = experienceResponses[0]
      } else if (question.includes("habilidades")) {
        response = skillsResponses[0]
      } else if (question.includes("projetos")) {
        response = projectResponses[0]
      }

      if (response) {
        setMessages((prev) => [...prev, response])
      }
      setIsTyping(false)
    }, 1500)
  }

  const resetChat = () => {
    setMessages(initialMessages)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const chatElementVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section id="ai-chat" className="py-20 md:py-32 relative bg-gradient-to-b from-card/50 to-background">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-12"
          style={{ opacity: 1 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Chat com <span className="text-gradient">Gustavo AI</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto">
            Pergunte sobre minha experiência de trabalho, habilidades, projetos ou serviços específicos
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"
          ></motion.div>
        </motion.div>

        <div className="max-w-3xl mx-auto" ref={chatContainerRef}>
          <motion.div
            className="glass rounded-2xl overflow-hidden chat-element"
            variants={chatElementVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Chat header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-card/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Gustavo AI</h3>
                  <p className="text-xs text-gray-400">Assistente Virtual</p>
                </div>
              </div>
              <button
                onClick={resetChat}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                title="Reset chat"
                type="button"
              >
                <RefreshCw size={16} />
              </button>
            </div>

            {/* Chat messages */}
            <div
              ref={chatMessagesRef}
              className="h-[400px] overflow-y-auto p-4 space-y-4 scroll-smooth"
              style={{ scrollBehavior: "smooth" }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.role === "user" ? "bg-primary/20 text-white" : "bg-card/50 text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.role === "assistant" ? (
                        <Bot size={16} className="text-primary" />
                      ) : (
                        <User size={16} className="text-secondary" />
                      )}
                      <span className="text-xs font-medium">{message.role === "assistant" ? "Gustavo AI" : "Você"}</span>
                    </div>
                    <div
                      className="text-sm rich-text"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="max-w-[80%] rounded-2xl p-3 bg-card/50 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <Bot size={16} className="text-primary" />
                      <span className="text-xs font-medium">Gustavo AI</span>
                    </div>
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="p-3 border-t border-white/10 flex gap-2 overflow-x-auto hide-scrollbar">
              <button
                type="button"
                onClick={() => handleQuickQuestion("Conte-me sobre a experiência de trabalho do Gustavo")}
                className="px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                Experiência de trabalho
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Quais são as habilidades do Gustavo?")}
                className="px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                Habilidades
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Conte-me sobre os projetos do Gustavo")}
                className="px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                Projetos
              </button>
            </div>

            {/* Chat input */}
            <div className="p-4 border-t border-white/10">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte sobre minha experiência, habilidades ou projetos..."
                  className="flex-1 bg-card/50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="p-2 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity disabled:opacity-50"
                  disabled={!input.trim()}
                >
                  <Send size={18} className="text-white" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* AI Assistant image */}
          <motion.div
            className="mt-8 flex justify-center chat-element"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 glow-effect">
                <Image
                  src="/images/minha-foto.jpeg"
                  alt="Gustavo"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
