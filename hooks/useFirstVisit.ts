"use client"

import { useEffect, useState } from 'react'

export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(true)

  useEffect(() => {
    // Verificar se já visitou na sessão atual
    const hasVisited = sessionStorage.getItem('hasVisited')
    
    if (hasVisited) {
      setIsFirstVisit(false)
    } else {
      // Marcar como visitado
      sessionStorage.setItem('hasVisited', 'true')
      setIsFirstVisit(true)
    }
  }, [])

  return isFirstVisit
}
