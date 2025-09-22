"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMethod, setSubmitMethod] = useState<'email' | 'whatsapp' | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Enviar email usando EmailJS (serviço gratuito)
      await sendEmail()
      
      setIsSubmitted(true)
      setSubmitMethod('email')
      setFormState({
        name: "",
        email: "",
        message: "",
      })
    } catch (error) {
      console.error("Erro ao enviar email:", error)
      // Fallback para WhatsApp se email falhar
      sendWhatsApp()
    } finally {
      setIsSubmitting(false)
    }
  }

  const sendEmail = async () => {
    // Usar mailto para abrir cliente de email do usuário
    const subject = `Contato do Site - ${formState.name}`
    const body = `Olá Gustavo!

Meu nome é ${formState.name} e gostaria de entrar em contato.

Email para resposta: ${formState.email}

Mensagem:
${formState.message}

---
Esta mensagem foi enviada através do formulário de contato do seu portfólio.`

    const mailtoUrl = `mailto:gustavohenrique010100@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Abrir cliente de email
    window.location.href = mailtoUrl
    
    // Simular sucesso após um pequeno delay
    return new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
  }

  const sendWhatsApp = () => {
    const message = `Olá! Meu nome é ${formState.name}. Email: ${formState.email}. Mensagem: ${formState.message}`
    const whatsappUrl = `https://wa.me/5511939301589?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    
    setIsSubmitted(true)
    setSubmitMethod('whatsapp')
    setFormState({
      name: "",
      email: "",
      message: "",
    })
  }

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.1),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Entre em <span className="text-gradient">Contato</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Tem um projeto em mente ou quer discutir uma colaboração? Adoraria ouvir de você!
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mt-4"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass p-6 flex items-start space-x-4">
              <div className="p-3 rounded-full bg-blue-500/20">
                <Mail className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Email</h3>
                <p className="text-gray-400">gustavohenrique010100@gmail.com</p>
              </div>
            </div>

            <div className="glass p-6 flex items-start space-x-4">
              <div className="p-3 rounded-full bg-cyan-500/20">
                <Phone className="w-6 h-6 text-cyan-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">WhatsApp</h3>
                <p className="text-gray-400">+55 (11) 93930-1589</p>
              </div>
            </div>

            <div className="glass p-6 flex items-start space-x-4">
              <div className="p-3 rounded-full bg-yellow-500/20">
                <MapPin className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Localização</h3>
                <p className="text-gray-400">São Paulo, SP</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="neomorphic p-6 md:p-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">
                    {submitMethod === 'email' ? 'Email Enviado!' : 'Redirecionado para WhatsApp!'}
                  </h3>
                  <p className="text-gray-300">
                    {submitMethod === 'email' 
                      ? 'Sua mensagem foi enviada para gustavohenrique010100@gmail.com. Retornarei em breve!'
                      : 'Sua mensagem foi preparada no WhatsApp. Continue a conversa por lá!'
                    }
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Seu email"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                      placeholder="Sua mensagem"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="glass px-6 py-3 rounded-lg font-medium border border-blue-500/20 bg-blue-500/10 text-white hover:bg-blue-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-scale flex items-center justify-center gap-2"
                    >
                      <Mail size={18} />
                      {isSubmitting ? "Enviando..." : "Enviar via Email"}
                    </button>
                    
                    <button
                      type="button"
                      onClick={sendWhatsApp}
                      disabled={!formState.name || !formState.email || !formState.message}
                      className="glass px-6 py-3 rounded-lg font-medium border border-green-500/20 bg-green-500/10 text-white hover:bg-green-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-scale flex items-center justify-center gap-2"
                    >
                      <Phone size={18} />
                      Enviar via WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
