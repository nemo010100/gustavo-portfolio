"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface LiquidButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function LiquidButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}: LiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  const variantStyles = {
    primary: {
      bg: "from-cyan-500 to-blue-600",
      hover: "from-cyan-400 to-blue-500",
      shadow: "shadow-cyan-500/25",
    },
    secondary: {
      bg: "from-purple-500 to-pink-600",
      hover: "from-purple-400 to-pink-500",
      shadow: "shadow-purple-500/25",
    },
  }

  const currentVariant = variantStyles[variant]

  return (
    <motion.button
      className={`
        relative overflow-hidden rounded-full font-semibold text-white
        ${sizeClasses[size]} ${currentVariant.shadow} ${className}
        focus:outline-none focus:ring-2 focus:ring-cyan-400/50
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background base */}
      <div className={`absolute inset-0 bg-gradient-to-r ${currentVariant.bg}`} />

      {/* Liquid effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${currentVariant.hover}`}
        initial={{ scale: 0, borderRadius: "50%" }}
        animate={{
          scale: isHovered ? 2 : 0,
          borderRadius: isHovered ? "0%" : "50%",
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        style={{
          transformOrigin: "center",
        }}
      />

      {/* Ripple effect on click */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          x: isHovered ? ["0%", "100%"] : "0%",
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          repeat: isHovered ? Infinity : 0,
          repeatDelay: 1,
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${currentVariant.hover} blur-xl opacity-0`}
        animate={{
          opacity: isHovered ? 0.4 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}
