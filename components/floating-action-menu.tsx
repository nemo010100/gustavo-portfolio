"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, MessageCircle, Mail, Phone, Github, Linkedin } from "lucide-react"

export default function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: MessageCircle, label: "WhatsApp", color: "bg-green-500", href: "https://wa.me/5511939301589" },
    { icon: Mail, label: "Email", color: "bg-blue-500", href: "mailto:gustavohenrique010100@gmail.com" },
    { icon: Phone, label: "Telefone", color: "bg-purple-500", href: "tel:+5511939301589" },
    { icon: Github, label: "GitHub", color: "bg-gray-700", href: "https://github.com" },
    { icon: Linkedin, label: "LinkedIn", color: "bg-blue-600", href: "https://linkedin.com" },
  ]

  const containerVariants = {
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    closed: {
      y: 20,
      opacity: 0,
      scale: 0.3,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Menu items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 left-0 flex flex-col gap-3"
            variants={containerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  ${item.color} p-3 rounded-full text-white shadow-lg
                  hover:scale-110 transition-transform duration-200
                  group relative
                `}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <item.icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-gray-900 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
                    {item.label}
                  </div>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white shadow-lg flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isOpen ? 45 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <Plus className="w-6 h-6" />
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-xl opacity-50"
          animate={{
            scale: isOpen ? 1.2 : 1,
            opacity: isOpen ? 0.7 : 0.3,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </div>
  )
}
