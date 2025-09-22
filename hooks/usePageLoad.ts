"use client"

import { useEffect, useState } from 'react'

export function usePageLoad() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let isMounted = true

    const checkPageLoad = () => {
      // Verificar se o documento está carregado
      if (document.readyState === 'complete') {
        // Aguardar um frame para garantir que tudo foi renderizado
        requestAnimationFrame(() => {
          if (isMounted) {
            setIsLoaded(true)
          }
        })
      } else {
        // Aguardar o evento de load
        const handleLoad = () => {
          requestAnimationFrame(() => {
            if (isMounted) {
              setIsLoaded(true)
            }
          })
        }

        window.addEventListener('load', handleLoad)
        
        return () => {
          window.removeEventListener('load', handleLoad)
        }
      }
    }

    checkPageLoad()

    return () => {
      isMounted = false
    }
  }, [])

  return isLoaded
}
