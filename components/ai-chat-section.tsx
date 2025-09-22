"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Send, Bot, User, Sparkles, RefreshCw } from "lucide-react"
import Image from "next/image"

// Predefined chat messages
const initialMessages = [
  {
    role: "assistant",
    content: "👋 Olá! Eu sou o Gustavo AI, seu assistente virtual. Pergunte sobre minha experiência em sites, tráfego pago e marketing digital!",
  },
]

const experienceResponses = [
  {
    role: "assistant",
    content: `Gustavo, aos 18 anos, tem experiência prática em:

**Desenvolvimento Web**
• Sites responsivos e otimizados
• Landing pages de alta conversão
• E-commerce e portfólios profissionais

**Tráfego Pago**
• Campanhas no Google Ads e Facebook Ads
• Otimização de ROI e geração de leads
• Análise de métricas e performance

**Tráfego Orgânico**
• SEO on-page e off-page
• Estratégias de conteúdo
• Otimização para buscadores`,
  },
]

const skillsResponses = [
  {
    role: "assistant",
    content: `Gustavo trabalha com:

**Criação de Sites** - Sites modernos e responsivos
**Tráfego Pago** - Google Ads e Facebook Ads
**Tráfego Orgânico** - SEO e marketing de conteúdo
**Marketing Digital** - Estratégias de crescimento online
**Landing Pages** - Páginas de alta conversão

Ferramentas: HTML, CSS, JavaScript, WordPress, Google Analytics, Facebook Business Manager, SEMrush.`,
  },
]

const projectResponses = [
  {
    role: "assistant",
    content: `Gustavo desenvolveu projetos como:

**Sites Corporativos** - Sites institucionais para empresas
**E-commerce** - Lojas virtuais completas
**Landing Pages** - Páginas de captura otimizadas
**Campanhas de Tráfego** - Anúncios que geram resultados
**Portfólios** - Sites profissionais personalizados

Cada projeto foca em resultados práticos e conversões reais para o negócio.`,
  },
]

const websiteResponses = [
  {
    role: "assistant",
    content: `Ótima escolha! Os serviços de criação de sites do Gustavo incluem:

**Sites Responsivos** - Design moderno que funciona em todos os dispositivos
**Landing Pages** - Páginas de alta conversão para campanhas
**E-commerce** - Lojas virtuais completas e funcionais
**Sites Institucionais** - Presença digital profissional
**Otimização SEO** - Sites otimizados para buscadores

**Tecnologias Utilizadas:**
• HTML5, CSS3, JavaScript
• WordPress e temas customizados
• Responsividade mobile-first
• Integração com Google Analytics

Gostaria de discutir um projeto de site específico?`,
  },
]

const trafficResponses = [
  {
    role: "assistant",
    content: `Perfeito! Os serviços de tráfego pago do Gustavo incluem:

**Google Ads** - Campanhas no Google para máxima visibilidade
**Facebook Ads** - Anúncios segmentados nas redes sociais
**Instagram Ads** - Campanhas visuais para engajamento
**Otimização de ROI** - Máximo retorno sobre investimento
**Análise de Métricas** - Acompanhamento detalhado de resultados

**Estratégias:**
• Segmentação precisa de público
• Testes A/B para otimização
• Campanhas de remarketing
• Gestão de orçamento inteligente

Que tipo de campanha você gostaria de criar?`,
  },
]

const seoResponses = [
  {
    role: "assistant",
    content: `Excelente! Os serviços de SEO e tráfego orgânico do Gustavo incluem:

**SEO On-Page** - Otimização interna do seu site
**SEO Off-Page** - Construção de autoridade externa
**Pesquisa de Palavras-chave** - Identificação de termos estratégicos
**Marketing de Conteúdo** - Criação de conteúdo relevante
**Análise de Concorrência** - Estratégias baseadas no mercado

**Ferramentas:**
• Google Analytics e Search Console
• SEMrush para análise de keywords
• Otimização técnica do site
• Estratégias de link building

Qual aspecto do SEO você gostaria de melhorar?`,
  },
]

const marketingResponses = [
  {
    role: "assistant",
    content: `Ótima escolha! Os serviços de marketing digital do Gustavo incluem:

**Estratégia Digital** - Planejamento completo de presença online
**Gestão de Redes Sociais** - Conteúdo e engajamento
**Email Marketing** - Campanhas de relacionamento
**Analytics e Relatórios** - Acompanhamento de resultados
**Funil de Vendas** - Otimização da jornada do cliente

**Serviços:**
• Criação de identidade visual
• Gestão de campanhas integradas
• Automação de marketing
• Análise de métricas e KPIs

Que aspecto do marketing digital você quer desenvolver?`,
  },
]

const customSoftwareResponses = [
  {
    role: "assistant",
    content: `Excellent! Gustavo's custom software development services include:

**Full-stack Development** - Complete web and mobile applications
**API Development** - RESTful and GraphQL API creation
**System Integration** - Connecting existing systems and platforms
**Cloud Solutions** - Scalable cloud-native applications
**Database Design** - Efficient data architecture and management

**Technologies:**
• Frontend: React, Next.js, Vue.js, Flutter
• Backend: Node.js, Python, PostgreSQL, MongoDB
• Cloud: AWS, Azure, Google Cloud Platform
• DevOps: Docker, Kubernetes, CI/CD pipelines

What type of custom software solution are you looking to build?`,
  },
]

const dataManagementResponses = [
  {
    role: "assistant",
    content: `Excellent! Gustavo's data management solutions cover:

**Database Architecture** - Scalable and efficient database design
**Data Pipeline Automation** - Streamlined data processing workflows
**Real-time Analytics** - Live data processing and insights
**Data Security** - Enterprise-grade security and compliance
**Cloud Integration** - AWS, Azure, and GCP data solutions
**Migration Services** - Seamless data migration and modernization

**Capabilities:**
• ETL/ELT pipeline development
• Data warehouse design and optimization
• Real-time streaming data processing
• Data governance and quality assurance

What specific data challenges are you looking to solve?`,
  },
]

// Novas mensagens pré-programadas sobre Gustavo
const personalInfoResponses = [
  {
    role: "assistant",
    content: `Olá! Deixe me me apresentar melhor:

**Sobre mim:**
• Nome: Gustavo, 18 anos
• Localização: São Paulo, SP
• Foco: Marketing Digital e Desenvolvimento Web

**Minha trajetória:**
Comecei cedo no mundo digital e me especializei em criar soluções que realmente funcionam para empresas. Moro em São Paulo, uma das maiores metrópoles do mundo, o que me dá acesso a um mercado dinâmico e diversificado.

**O que me motiva:**
Transformar ideias em resultados digitais concretos!`,
  },
]

const locationResponses = [
  {
    role: "assistant", 
    content: `Moro em São Paulo, a maior cidade do Brasil! 🏙️

**Por que São Paulo é estratégico:**
• Hub financeiro e tecnológico do país
• Mercado digital em constante crescimento
• Acesso a empresas de todos os tamanhos
• Networking com profissionais de ponta

**Vantagens para meus clientes:**
• Entendo o mercado paulistano
• Acompanho tendências em tempo real
• Horário comercial alinhado com SP
• Posso atender presencialmente na região

Trabalho tanto com clientes locais quanto de todo o Brasil!`,
  },
]

const servicesDetailResponses = [
  {
    role: "assistant",
    content: `Aqui estão meus principais serviços:

**💻 Desenvolvimento Web**
• Sites institucionais completos
• Landing pages otimizadas para conversão
• E-commerce com sistema de pagamento
• Portfólios profissionais
• Manutenção e suporte técnico

**📈 Marketing Digital** 
• Estratégia digital completa
• Análise de concorrência
• Planejamento de campanhas
• Relatórios de performance
• Consultoria em marketing

**🎯 Gestão de Tráfego**
• Google Ads (Search, Display, Shopping)
• Meta Ads (Facebook e Instagram)
• Otimização de campanhas existentes
• Análise de métricas e KPIs
• Remarketing e audiences

Qual área te interessa mais?`,
  },
]

const processResponses = [
  {
    role: "assistant",
    content: `Meu processo de trabalho é bem estruturado:

**1. 📋 Briefing e Planejamento**
• Entender objetivos e necessidades
• Análise do mercado e concorrência
• Definição de estratégia personalizada

**2. 🎨 Criação e Desenvolvimento**
• Design responsivo e moderno
• Desenvolvimento com foco em UX
• Testes em diferentes dispositivos

**3. 🚀 Lançamento e Otimização**
• Configuração de analytics
• Monitoramento de performance
• Ajustes baseados em dados

**4. 📊 Acompanhamento**
• Relatórios mensais detalhados
• Suporte técnico contínuo
• Melhorias e atualizações

Transparência e resultados são minha prioridade!`,
  },
]

const portfolioResponses = [
  {
    role: "assistant",
    content: `Alguns dos meus trabalhos recentes:

**🏢 Sites Corporativos**
• Empresas de consultoria
• Escritórios de advocacia  
• Clínicas médicas
• Prestadores de serviços

**🛍️ E-commerce**
• Lojas de roupas online
• Produtos digitais
• Marketplace de serviços
• Dropshipping

**📱 Landing Pages**
• Captação de leads para imobiliárias
• Vendas de cursos online
• Campanhas de lançamento
• Eventos e webinars

**📈 Campanhas de Tráfego**
• ROI médio de 300% em vendas
• Redução de 40% no custo por lead
• Aumento de 250% em conversões

Quer ver exemplos específicos do seu segmento?`,
  },
]

const contactResponses = [
  {
    role: "assistant",
    content: `Vamos conversar sobre seu projeto! 💬

**📱 WhatsApp:** (11) 99999-9999
**📧 Email:** gustavohenrique010100@gmail.com
**📍 Atendimento:** São Paulo e região

**🕒 Horários de atendimento:**
• Segunda a Sexta: 9h às 18h
• Sábado: 9h às 12h
• Emergências: WhatsApp 24h

**💰 Orçamento Gratuito:**
• Análise do seu projeto
• Proposta personalizada
• Sem compromisso

**🎯 Primeira Consultoria:**
30 minutos grátis para entender suas necessidades!

Clique aqui para falar comigo: [WhatsApp](https://wa.me/5511999999999)`,
  },
]

const testimonialsResponses = [
  {
    role: "assistant",
    content: `O que meus clientes falam sobre meu trabalho:

**⭐⭐⭐⭐⭐ Maria Silva - E-commerce de Moda**
"O Gustavo criou nossa loja online e nossas vendas triplicaram! Muito profissional e entrega no prazo."

**⭐⭐⭐⭐⭐ João Santos - Consultoria Empresarial** 
"Site ficou incrível e as campanhas no Google trouxeram muitos clientes qualificados."

**⭐⭐⭐⭐⭐ Ana Costa - Clínica Estética**
"Campanhas no Instagram geraram mais de 200 agendamentos no primeiro mês!"

**⭐⭐⭐⭐⭐ Pedro Lima - Advocacia**
"Profissional sério, trabalho de qualidade. Recomendo!"

**📊 Resultados médios dos clientes:**
• +180% aumento em leads
• +250% melhoria na conversão
• +300% retorno sobre investimento

Posso mostrar cases específicos do seu segmento!`,
  },
]

// Rich text formatting function
const formatMessage = (content: string) => {
  // Convert **text** to bold
  let formatted = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

  // Convert bullet points to proper list items
  formatted = formatted.replace(/• (.+)/g, "<li>$1</li>")

  // Wrap consecutive list items in ul tags
  formatted = formatted.replace(/(<li>.*<\/li>\s*)+/g, "<ul>$&</ul>")

  // Convert line breaks to proper spacing
  formatted = formatted.replace(/\n\n/g, "<br><br>")
  formatted = formatted.replace(/\n/g, "<br>")

  return formatted
}

export default function AIChatSection() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatInteractive, setChatInteractive] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatMessagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.01, margin: "200px 0px -600px 0px" })
  const controls = useAnimation()

  // Separate ref for the avatar - should stay visible longer
  const avatarRef = useRef<HTMLDivElement>(null)
  const isAvatarInView = useInView(avatarRef, { once: false, amount: 0.1, margin: "100px 0px -400px 0px" })

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
      setChatInteractive(true)
    } else {
      // Keep chat interactive for 2 seconds after leaving view
      const timer = setTimeout(() => {
        setChatInteractive(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isInView, controls])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Listen for service click events
  useEffect(() => {
    const handleServiceMessage = (event: any) => {
      const { message } = event.detail
      if (message) {
        // Add user message
        const userMessage = { role: "user", content: message }
        setMessages((prev) => [...prev, userMessage])
        setIsTyping(true)

        // Simulate AI response
        setTimeout(() => {
          let response
          const lowercaseMessage = message.toLowerCase()

          if (lowercaseMessage.includes("criação de sites") || lowercaseMessage.includes("site")) {
            response = websiteResponses[0]
          } else if (lowercaseMessage.includes("tráfego pago") || lowercaseMessage.includes("google ads")) {
            response = trafficResponses[0]
          } else if (lowercaseMessage.includes("seo") || lowercaseMessage.includes("tráfego orgânico")) {
            response = seoResponses[0]
          } else if (lowercaseMessage.includes("marketing digital")) {
            response = marketingResponses[0]
          } else if (lowercaseMessage.includes("custom software")) {
            response = customSoftwareResponses[0]
          } else if (lowercaseMessage.includes("data management")) {
            response = dataManagementResponses[0]
          } else {
            response = {
              role: "assistant",
              content:
                "Thank you for your interest! I'd be happy to discuss this service with you. What specific requirements do you have?",
            }
          }

          setMessages((prev) => [...prev, response])
          setIsTyping(false)
        }, 1500)
      }
    }

    window.addEventListener("triggerChatMessage", handleServiceMessage)
    return () => window.removeEventListener("triggerChatMessage", handleServiceMessage)
  }, [])

  const scrollToBottom = () => {
    // Only scroll within the chat container, not the entire page
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }

  // Function to get predefined response based on keywords
  const getPredefinedResponse = (input: string) => {
    const lowercaseInput = input.toLowerCase()

    // Personal info keywords
    if (lowercaseInput.includes("quem é") || lowercaseInput.includes("sobre você") || lowercaseInput.includes("apresente")) {
      return personalInfoResponses[0]
    }
    // Location keywords  
    else if (lowercaseInput.includes("onde") || lowercaseInput.includes("são paulo") || lowercaseInput.includes("localização")) {
      return locationResponses[0]
    }
    // Services keywords
    else if (lowercaseInput.includes("serviços") || lowercaseInput.includes("o que faz") || lowercaseInput.includes("trabalha com")) {
      return servicesDetailResponses[0]
    }
    // Process keywords
    else if (lowercaseInput.includes("processo") || lowercaseInput.includes("como trabalha") || lowercaseInput.includes("metodologia")) {
      return processResponses[0]
    }
    // Portfolio keywords
    else if (lowercaseInput.includes("portfólio") || lowercaseInput.includes("trabalhos") || lowercaseInput.includes("exemplos")) {
      return portfolioResponses[0]
    }
    // Contact keywords
    else if (lowercaseInput.includes("contato") || lowercaseInput.includes("whatsapp") || lowercaseInput.includes("falar")) {
      return contactResponses[0]
    }
    // Testimonials keywords
    else if (lowercaseInput.includes("avaliação") || lowercaseInput.includes("depoimento") || lowercaseInput.includes("clientes")) {
      return testimonialsResponses[0]
    }
    // Experience keywords
    else if (lowercaseInput.includes("experiência") || lowercaseInput.includes("trabalho") || lowercaseInput.includes("carreira")) {
      return experienceResponses[0]
    }
    // Skills keywords
    else if (lowercaseInput.includes("habilidade") || lowercaseInput.includes("conhecimento") || lowercaseInput.includes("sabe fazer")) {
      return skillsResponses[0]
    }
    // Projects keywords
    else if (lowercaseInput.includes("projeto") || lowercaseInput.includes("desenvolveu") || lowercaseInput.includes("criou")) {
      return projectResponses[0]
    }
    // Website keywords
    else if (lowercaseInput.includes("site") || lowercaseInput.includes("criação") || lowercaseInput.includes("desenvolvimento web")) {
      return websiteResponses[0]
    }
    // Traffic keywords
    else if (lowercaseInput.includes("tráfego pago") || lowercaseInput.includes("ads") || lowercaseInput.includes("google ads")) {
      return trafficResponses[0]
    }
    // SEO keywords
    else if (lowercaseInput.includes("seo") || lowercaseInput.includes("orgânico") || lowercaseInput.includes("buscadores")) {
      return seoResponses[0]
    }
    // Marketing keywords
    else if (lowercaseInput.includes("marketing")) {
      return marketingResponses[0]
    }
    
    return null
  }

  // Function to handle AI response with fallback
  const handleAIResponse = async (userInput: string) => {
    try {
      // Try to get a predefined response first (for better UX)
      const predefinedResponse = getPredefinedResponse(userInput)
      
      if (predefinedResponse) {
        setTimeout(() => {
          setMessages((prev) => [...prev, predefinedResponse])
          setIsTyping(false)
        }, 1000)
        return
      }

      // If no predefined response, try AI API
      const aiResponse = await callAIAPI(userInput)
      
      if (aiResponse) {
        setTimeout(() => {
          setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }])
          setIsTyping(false)
        }, 1500)
      } else {
        // Fallback response if AI fails
        setTimeout(() => {
          setMessages((prev) => [...prev, {
            role: "assistant",
            content: `Olá! Sou o Gustavo, especialista em marketing digital e desenvolvimento web em São Paulo. 

Posso te ajudar com:
• **Sites** e landing pages
• **Tráfego pago** (Google Ads, Facebook Ads)  
• **SEO** e tráfego orgânico
• **Consultoria** em marketing digital

O que você gostaria de saber sobre meus serviços? 😊`
          }])
          setIsTyping(false)
        }, 1000)
      }
    } catch (error) {
      console.error("Error in AI response:", error)
      // Fallback on error
      setTimeout(() => {
        setMessages((prev) => [...prev, {
          role: "assistant", 
          content: "Desculpe, houve um problema temporário. Mas posso te ajudar! Pergunte sobre meus serviços, experiência ou projetos. O que você gostaria de saber? 😊"
        }])
        setIsTyping(false)
      }, 1000)
    }
  }

  // Function to call AI API (using a free service)
  const callAIAPI = async (userInput: string): Promise<string | null> => {
    try {
      // Using Hugging Face's free inference API
      const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `Você é Gustavo, um especialista em marketing digital de 18 anos de São Paulo. Você trabalha com criação de sites, tráfego pago, SEO e marketing digital. Seja amigável, profissional e sempre mencione seus serviços quando relevante. Pergunta: ${userInput}`,
          parameters: {
            max_length: 200,
            temperature: 0.7,
          }
        })
      })

      if (response.ok) {
        const data = await response.json()
        return data.generated_text || null
      }
    } catch (error) {
      console.error("AI API Error:", error)
    }
    
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Focus back on input after submission
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    // Try AI API first, then fall back to predefined responses
    handleAIResponse(input)
  }

  const handleQuickQuestion = (question: string) => {
    // Simulate user clicking a quick question
    const userMessage = { role: "user", content: question }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Use the same AI response system
    handleAIResponse(question)
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
    visible: { y: 0, opacity: 1 },
  }

  const chatElementVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <section id="experience" className="py-20 md:py-32 relative bg-gradient-to-b from-card/50 to-background">
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
          <motion.h2 variants={itemVariants} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Chat with <span className="text-gradient">Gustavo AI</span>
          </motion.h2>
          <motion.p variants={itemVariants} transition={{ duration: 0.6, delay: 0.1 }} className="text-gray-300 max-w-2xl mx-auto">
            Pergunte sobre minha experiência, habilidades, projetos ou serviços específicos
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"
          ></motion.div>
        </motion.div>

        <div className="max-w-3xl mx-auto px-4" ref={chatContainerRef}>
          <motion.div
            className="glass rounded-2xl overflow-hidden chat-element w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isInView ? 1 : 0.1, 
              y: isInView ? 0 : 20 
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ 
              pointerEvents: chatInteractive ? "auto" : "none",
              position: "relative",
              zIndex: chatInteractive ? 10 : 1
            }}
          >
            {/* Chat header */}
            <div className="p-3 md:p-4 border-b border-white/10 flex items-center justify-between bg-card/50">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-sm md:text-base">Gustavo AI</h3>
                  <p className="text-xs text-gray-400">Virtual Assistant</p>
                </div>
              </div>
              <button
                onClick={resetChat}
                className="p-1.5 md:p-2 rounded-full hover:bg-white/10 transition-colors touch-manipulation"
                title="Reset chat"
                type="button"
              >
                <RefreshCw size={14} className="md:w-4 md:h-4" />
              </button>
            </div>

            {/* Chat messages - Fixed height container with internal scrolling */}
            <div
              ref={chatMessagesRef}
              className="h-[300px] md:h-[400px] overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 scroll-smooth"
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
                    className={`max-w-[85%] md:max-w-[80%] rounded-2xl p-2 md:p-3 ${
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
                      className="text-xs md:text-sm rich-text"
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
                  <div className="max-w-[85%] md:max-w-[80%] rounded-2xl p-2 md:p-3 bg-card/50 text-white">
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

              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="p-2 md:p-3 border-t border-white/10 flex gap-1.5 md:gap-2 overflow-x-auto hide-scrollbar">
              <button
                type="button"
                onClick={() => handleQuickQuestion("Quem é você?")}
                className="px-2 md:px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors touch-manipulation"
              >
                Sobre mim
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Onde você mora?")}
                className="px-2 md:px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors touch-manipulation"
              >
                São Paulo
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Quais são seus serviços?")}
                className="px-2 md:px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors touch-manipulation"
              >
                Serviços
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Como é seu processo de trabalho?")}
                className="px-2 md:px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors touch-manipulation"
              >
                Processo
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Mostre seu portfólio")}
                className="px-2 md:px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors touch-manipulation"
              >
                Portfólio
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Como entrar em contato?")}
                className="px-2 md:px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors touch-manipulation"
              >
                Contato
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Depoimentos de clientes")}
                className="px-2 md:px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors touch-manipulation"
              >
                Avaliações
              </button>
            </div>

            {/* Chat input */}
            <div className="p-3 md:p-4 border-t border-white/10">
              <form onSubmit={handleSubmit} className="flex gap-1.5 md:gap-2">
                <input
                  type="text"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte sobre minha experiência, habilidades ou projetos..."
                  className="flex-1 bg-card/50 rounded-full px-3 md:px-4 py-2 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="p-1.5 md:p-2 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity disabled:opacity-50 touch-manipulation"
                  disabled={!input.trim()}
                >
                  <Send size={16} className="text-white md:w-4.5 md:h-4.5" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* AI Assistant image */}
          <motion.div
            ref={avatarRef}
            className="mt-4 md:mt-8 flex justify-center chat-element"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isAvatarInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="relative">
              <motion.div 
                className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-primary/30 glow-effect relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/images/minha-foto.jpeg"
                  alt="Gustavo"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center z-20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <Sparkles size={12} className="text-white md:w-3.5 md:h-3.5" />
              </motion.div>
              {/* Floating effect particles */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary/60 rounded-full"
                    style={{
                      left: `${20 + i * 25}%`,
                      top: `${15 + i * 20}%`,
                    }}
                    animate={{
                      y: [-10, -20, -10],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


  // Function to call AI API (using a free service)
  const callAIAPI = async (userInput: string): Promise<string | null> => {
    try {
      // Using Hugging Face's free inference API
      const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `Você é Gustavo, um especialista em marketing digital de 18 anos de São Paulo. Você trabalha com criação de sites, tráfego pago, SEO e marketing digital. Seja amigável, profissional e sempre mencione seus serviços quando relevante. Pergunta: ${userInput}`,
          parameters: {
            max_length: 200,
            temperature: 0.7,
          }
        })
      })

      if (response.ok) {
        const data = await response.json()
        return data.generated_text || null
      }
    } catch (error) {
      console.error("AI API Error:", error)
    }
    
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Focus back on input after submission
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    // Try AI API first, then fall back to predefined responses
    handleAIResponse(input)
  }

  const handleQuickQuestion = (question: string) => {
    // Simulate user clicking a quick question
    const userMessage = { role: "user", content: question }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Use the same AI response system
    handleAIResponse(question)
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
    visible: { y: 0, opacity: 1 },
  }

  const chatElementVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <section id="experience" className="py-20 md:py-32 relative bg-gradient-to-b from-card/50 to-background">
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
          <motion.h2 variants={itemVariants} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Chat with <span className="text-gradient">Gustavo AI</span>
          </motion.h2>
          <motion.p variants={itemVariants} transition={{ duration: 0.6, delay: 0.1 }} className="text-gray-300 max-w-2xl mx-auto">
            Pergunte sobre minha experiência, habilidades, projetos ou serviços específicos
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"
          ></motion.div>
        </motion.div>

        <div className="max-w-3xl mx-auto px-4" ref={chatContainerRef}>
          <motion.div
            className="glass rounded-2xl overflow-hidden chat-element w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isInView ? 1 : 0.1, 
              y: isInView ? 0 : 20 
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ 
              pointerEvents: chatInteractive ? "auto" : "none",
              position: "relative",
              zIndex: chatInteractive ? 10 : 1
            }}
          >
            {/* Chat header */}
            <div className="p-3 md:p-4 border-b border-white/10 flex items-center justify-between bg-card/50">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-sm md:text-base">Gustavo AI</h3>
                  <p className="text-xs text-gray-400">Virtual Assistant</p>
                </div>
              </div>
              <button
                onClick={resetChat}
                className="p-1.5 md:p-2 rounded-full hover:bg-white/10 transition-colors touch-manipulation"
                title="Reset chat"
                type="button"
              >
                <RefreshCw size={14} className="md:w-4 md:h-4" />
              </button>
            </div>

            {/* Chat messages - Fixed height container with internal scrolling */}
            <div
              ref={chatMessagesRef}
              className="h-[300px] md:h-[400px] overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 scroll-smooth"
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
                    className={`max-w-[85%] md:max-w-[80%] rounded-2xl p-2 md:p-3 ${
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
                      className="text-xs md:text-sm rich-text"
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
                  <div className="max-w-[85%] md:max-w-[80%] rounded-2xl p-2 md:p-3 bg-card/50 text-white">
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

              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="p-2 md:p-3 border-t border-white/10 flex gap-1.5 md:gap-2 overflow-x-auto hide-scrollbar">
              <button
                type="button"
                onClick={() => handleQuickQuestion("Quem é você?")}
                className="px-2 md:px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors touch-manipulation"
              >
                Sobre mim
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Onde você mora?")}
                className="px-2 md:px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors touch-manipulation"
              >
                São Paulo
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Quais são seus serviços?")}
                className="px-2 md:px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors touch-manipulation"
              >
                Serviços
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Como é seu processo de trabalho?")}
                className="px-2 md:px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors touch-manipulation"
              >
                Processo
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Mostre seu portfólio")}
                className="px-2 md:px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors touch-manipulation"
              >
                Portfólio
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Como entrar em contato?")}
                className="px-2 md:px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors touch-manipulation"
              >
                Contato
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Depoimentos de clientes")}
                className="px-2 md:px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors touch-manipulation"
              >
                Avaliações
              </button>
            </div>

            {/* Chat input */}
            <div className="p-3 md:p-4 border-t border-white/10">
              <form onSubmit={handleSubmit} className="flex gap-1.5 md:gap-2">
                <input
                  type="text"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte sobre minha experiência, habilidades ou projetos..."
                  className="flex-1 bg-card/50 rounded-full px-3 md:px-4 py-2 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="p-1.5 md:p-2 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity disabled:opacity-50 touch-manipulation"
                  disabled={!input.trim()}
                >
                  <Send size={16} className="text-white md:w-4.5 md:h-4.5" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* AI Assistant image */}
          <motion.div
            ref={avatarRef}
            className="mt-4 md:mt-8 flex justify-center chat-element"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isAvatarInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="relative">
              <motion.div 
                className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-primary/30 glow-effect relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/images/minha-foto.jpeg"
                  alt="Gustavo"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center z-20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <Sparkles size={12} className="text-white md:w-3.5 md:h-3.5" />
              </motion.div>
              {/* Floating effect particles */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary/60 rounded-full"
                    style={{
                      left: `${20 + i * 25}%`,
                      top: `${15 + i * 20}%`,
                    }}
                    animate={{
                      y: [-10, -20, -10],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Send, Bot, User, Sparkles, RefreshCw } from "lucide-react"
import Image from "next/image"

// Predefined chat messages
const initialMessages = [
  {
    role: "assistant",
    content: "👋 Hi there! I'm AI Ibro, your virtual assistant. Ask me about Gustavo's work experience or skills!",
  },
]

const experienceResponses = [
  {
    role: "assistant",
    content: `Gustavo has over 7 years of experience in AI and automation:

**Lead AI Engineer** at TechInnovate (2021-Present)
• Developed custom NLP solutions for enterprise clients
• Led a team of 5 engineers across 12 successful projects
• Increased operational efficiency by 40% through automation

**Senior AI Developer** at DataSphere (2018-2021)
• Created recommendation engines with 28% higher engagement
• Optimized data processing pipelines, reducing costs by 45%
• Mentored junior developers and conducted workshops`,
  },
]

const skillsResponses = [
  {
    role: "assistant",
    content: `Gustavo specializes in:

**AI Development** - Building intelligent systems with ML/DL
**Process Automation** - Creating efficient workflows
**Data Analysis** - Extracting actionable insights
**Voice AI** - Developing natural voice interfaces
**Chatbot Development** - Creating conversational experiences

He's proficient with tools like N8N, Airtable, GPT, Gemini, ElevenLabs, and various cloud platforms.`,
  },
]

const projectResponses = [
  {
    role: "assistant",
    content: `Gustavo has built several innovative projects:

**TaskFlow** - Productivity app with gamification
**OneSoft** - All-in-one business platform
**HabitFlow** - Wellness and habit tracking app
**Film Fan Finder** - AI movie recommendation system
**AI Automation Consultant** - Intelligent workflow automation

Each project demonstrates his expertise in creating user-friendly, AI-powered solutions.`,
  },
]

const aiDevelopmentResponses = [
  {
    role: "assistant",
    content: `Excellent choice! Gustavo's AI development services include:

**Machine Learning Models** - Custom ML solutions for your specific needs
**Neural Networks** - Deep learning implementations for complex problems
**Computer Vision** - Image and video analysis capabilities
**Natural Language Processing** - Text analysis and language understanding
**Predictive Analytics** - Forecasting and trend analysis systems

**Technologies Used:**
• Python, TensorFlow, PyTorch
• OpenAI GPT, Google Gemini
• AWS SageMaker, Azure ML
• Custom model training and deployment

Would you like to discuss a specific AI project for your business?`,
  },
]

const processAutomationResponses = [
  {
    role: "assistant",
    content: `Perfect! Gustavo's process automation solutions cover:

**RPA Implementation** - Robotic Process Automation for repetitive tasks
**Workflow Optimization** - Streamlined business processes
**API Integration** - Connecting different systems seamlessly
**Task Automation** - Automated scheduling and execution
**Business Intelligence** - Automated reporting and analytics

**Tools & Platforms:**
• N8N for workflow automation
• Zapier and Make.com integrations
• Custom Python automation scripts
• Cloud-based automation solutions

What specific processes are you looking to automate?`,
  },
]

const dataAnalyticsResponses = [
  {
    role: "assistant",
    content: `Great choice! Gustavo's data analytics services include:

**Predictive Analytics** - Forecasting future trends and outcomes
**Data Visualization** - Interactive dashboards and reports
**Business Intelligence** - Strategic insights from your data
**Performance Metrics** - KPI tracking and optimization
**Real-time Analytics** - Live data processing and monitoring

**Technologies:**
• Python (Pandas, NumPy, Scikit-learn)
• Tableau, Power BI for visualization
• SQL databases and data warehouses
• Apache Spark for big data processing

What kind of data insights are you looking to gain?`,
  },
]

const chatbotResponses = [
  {
    role: "assistant",
    content: `Great choice! Gustavo's chatbot development services include:

**Natural Language Processing** - Advanced NLP for human-like conversations
**Multi-platform Integration** - Deploy across web, mobile, and messaging platforms
**Voice Integration** - Voice-enabled chatbots with speech recognition
**Custom Training** - Tailored to your business knowledge and tone
**Analytics Dashboard** - Track conversations and optimize performance

**Features:**
• 24/7 customer support automation
• Lead generation and qualification
• FAQ automation and knowledge base
• Integration with CRM and business systems

Would you like to discuss a specific chatbot project for your business?`,
  },
]

const customSoftwareResponses = [
  {
    role: "assistant",
    content: `Excellent! Gustavo's custom software development services include:

**Full-stack Development** - Complete web and mobile applications
**API Development** - RESTful and GraphQL API creation
**System Integration** - Connecting existing systems and platforms
**Cloud Solutions** - Scalable cloud-native applications
**Database Design** - Efficient data architecture and management

**Technologies:**
• Frontend: React, Next.js, Vue.js, Flutter
• Backend: Node.js, Python, PostgreSQL, MongoDB
• Cloud: AWS, Azure, Google Cloud Platform
• DevOps: Docker, Kubernetes, CI/CD pipelines

What type of custom software solution are you looking to build?`,
  },
]

const dataManagementResponses = [
  {
    role: "assistant",
    content: `Excellent! Gustavo's data management solutions cover:

**Database Architecture** - Scalable and efficient database design
**Data Pipeline Automation** - Streamlined data processing workflows
**Real-time Analytics** - Live data processing and insights
**Data Security** - Enterprise-grade security and compliance
**Cloud Integration** - AWS, Azure, and GCP data solutions
**Migration Services** - Seamless data migration and modernization

**Capabilities:**
• ETL/ELT pipeline development
• Data warehouse design and optimization
• Real-time streaming data processing
• Data governance and quality assurance

What specific data challenges are you looking to solve?`,
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

  // Listen for service click events
  useEffect(() => {
    const handleServiceMessage = (event: any) => {
      const { message } = event.detail
      if (message) {
        // Add user message
        const userMessage = { role: "user", content: message }
        setMessages((prev) => [...prev, userMessage])
        setIsTyping(true)

        // Simulate AI response
        setTimeout(() => {
          let response
          const lowercaseMessage = message.toLowerCase()

          if (lowercaseMessage.includes("ai development")) {
            response = aiDevelopmentResponses[0]
          } else if (lowercaseMessage.includes("process automation")) {
            response = processAutomationResponses[0]
          } else if (lowercaseMessage.includes("data analytics")) {
            response = dataAnalyticsResponses[0]
          } else if (lowercaseMessage.includes("chatbot")) {
            response = chatbotResponses[0]
          } else if (lowercaseMessage.includes("custom software")) {
            response = customSoftwareResponses[0]
          } else if (lowercaseMessage.includes("data management")) {
            response = dataManagementResponses[0]
          } else {
            response = {
              role: "assistant",
              content:
                "Thank you for your interest! I'd be happy to discuss this service with you. What specific requirements do you have?",
            }
          }

          setMessages((prev) => [...prev, response])
          setIsTyping(false)
        }, 1500)
      }
    }

    window.addEventListener("triggerChatMessage", handleServiceMessage)
    return () => window.removeEventListener("triggerChatMessage", handleServiceMessage)
  }, [])

  const scrollToBottom = () => {
    // Only scroll within the chat container, not the entire page
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Focus back on input after submission
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    // Simulate AI response
    setTimeout(() => {
      let response
      const lowercaseInput = input.toLowerCase()

      if (lowercaseInput.includes("experience") || lowercaseInput.includes("work") || lowercaseInput.includes("job")) {
        response = experienceResponses[0]
      } else if (lowercaseInput.includes("skill") || lowercaseInput.includes("know") || lowercaseInput.includes("do")) {
        response = skillsResponses[0]
      } else if (
        lowercaseInput.includes("project") ||
        lowercaseInput.includes("portfolio") ||
        lowercaseInput.includes("build")
      ) {
        response = projectResponses[0]
      } else if (lowercaseInput.includes("ai development") || lowercaseInput.includes("machine learning")) {
        response = aiDevelopmentResponses[0]
      } else if (lowercaseInput.includes("process automation") || lowercaseInput.includes("workflow")) {
        response = processAutomationResponses[0]
      } else if (lowercaseInput.includes("data analytics") || lowercaseInput.includes("analytics")) {
        response = dataAnalyticsResponses[0]
      } else if (lowercaseInput.includes("chatbot")) {
        response = chatbotResponses[0]
      } else if (lowercaseInput.includes("custom software") || lowercaseInput.includes("software development")) {
        response = customSoftwareResponses[0]
      } else if (lowercaseInput.includes("data management") || lowercaseInput.includes("database")) {
        response = dataManagementResponses[0]
      } else {
        response = {
          role: "assistant",
          content:
            "I can tell you about Gustavo's work experience, skills, projects, or specific services like AI development, process automation, data analytics, chatbot development, custom software, and data management. What would you like to know?",
        }
      }

      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    // Simulate user clicking a quick question
    const userMessage = { role: "user", content: question }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let response

      if (question.includes("experience")) {
        response = experienceResponses[0]
      } else if (question.includes("skills")) {
        response = skillsResponses[0]
      } else if (question.includes("projects")) {
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
    <section id="experience" className="py-20 md:py-32 relative bg-gradient-to-b from-card/50 to-background">
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
            Chat with <span className="text-gradient">AI Ibro</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto">
            Ask about my work experience, skills, projects, or specific services
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
                  <h3 className="font-medium">AI Ibro</h3>
                  <p className="text-xs text-gray-400">Virtual Assistant</p>
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

            {/* Chat messages - Fixed height container with internal scrolling */}
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
                      <span className="text-xs font-medium">{message.role === "assistant" ? "AI Ibro" : "You"}</span>
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
                      <span className="text-xs font-medium">AI Ibro</span>
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

              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="p-3 border-t border-white/10 flex gap-2 overflow-x-auto hide-scrollbar">
              <button
                type="button"
                onClick={() => handleQuickQuestion("Tell me about Gustavo's work experience")}
                className="px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                Work experience
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("What are Gustavo's skills?")}
                className="px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                Skills
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Tell me about Gustavo's projects")}
                className="px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                Projects
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
                  placeholder="Ask about my experience, skills, or projects..."
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
                  src="/images/ibrahim-avatar.png"
                  alt="Gustavo Mustafa"
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
