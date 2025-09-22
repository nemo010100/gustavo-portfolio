"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 relative">
      <div className="container mx-auto px-4">
        <div className="glass p-8 rounded-2xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-gradient">Gustavo</h3>
              <p className="text-gray-400 mb-4 max-w-xs">
                Especialista em Marketing Digital transformando negócios com estratégias inovadoras.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="https://wa.me/5511999999999"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-colors"
                  aria-label="Github"
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="https://wa.me/5511999999999"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </motion.a>
                <motion.a
                  href="https://wa.me/5511999999999"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  href="https://wa.me/5511999999999"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </motion.a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                    Serviços
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
                    Projetos
                  </a>
                </li>
                <li>
                  <a href="#chat" className="text-gray-400 hover:text-white transition-colors">
                    Chat
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Serviços</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Tráfego Pago</li>
                <li className="text-gray-400">Tráfego Orgânico</li>
                <li className="text-gray-400">Criação de Sites</li>
                <li className="text-gray-400">Painel de Controle</li>
                <li className="text-gray-400">Automação de Marketing</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; {currentYear} Gustavo. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
