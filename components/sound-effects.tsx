"use client"

import { useEffect, useState } from "react"

export default function SoundEffects() {
  const [audioEnabled, setAudioEnabled] = useState(false)

  useEffect(() => {
    // Só ativar som após interação do usuário
    const enableAudio = () => {
      setAudioEnabled(true)
      document.removeEventListener("click", enableAudio)
    }

    document.addEventListener("click", enableAudio)
    return () => document.removeEventListener("click", enableAudio)
  }, [])

  const playSound = (frequency: number, duration: number = 100) => {
    if (!audioEnabled) return

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration / 1000)
    } catch (error) {
      // Silently fail if audio not supported
    }
  }

  useEffect(() => {
    // Som de hover em botões
    const buttons = document.querySelectorAll("button, a[href]")
    
    const handleHover = () => playSound(800, 50)
    const handleClick = () => playSound(1000, 100)

    buttons.forEach(button => {
      button.addEventListener("mouseenter", handleHover)
      button.addEventListener("click", handleClick)
    })

    return () => {
      buttons.forEach(button => {
        button.removeEventListener("mouseenter", handleHover)
        button.removeEventListener("click", handleClick)
      })
    }
  }, [audioEnabled])

  return null
}
