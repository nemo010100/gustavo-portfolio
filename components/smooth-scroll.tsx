"use client"

import { useEffect } from "react"

export default function SmoothScroll() {
  useEffect(() => {
    // Adiciona scroll suave para todo o documento
    const smoothScroll = () => {
      document.documentElement.style.scrollBehavior = "smooth"
    }

    // Remove qualquer scroll behavior anterior e adiciona o novo
    document.documentElement.style.scrollBehavior = ""
    setTimeout(smoothScroll, 100)

    // Intercepta cliques em links âncora para scroll suave
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement
      
      if (link) {
        e.preventDefault()
        const targetId = link.getAttribute('href')?.substring(1)
        const targetElement = targetId ? document.getElementById(targetId) : null
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return null
}


