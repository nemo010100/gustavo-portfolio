"use client"

import { useEffect, useState } from "react"

interface PreloadSectionsProps {
  onSectionsLoaded: () => void
}

export default function PreloadSections({ onSectionsLoaded }: PreloadSectionsProps) {
  const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    let isMounted = true
    
    const preloadSections = async () => {
      try {
        // Precarregar imagens das seções críticas
        const criticalImages = [
          '/images/background-photo.jpg',
          '/images/minha-foto.jpeg'
        ]

        // Aguardar o carregamento real das imagens
        const imagePromises = criticalImages.map(src => 
          new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
              if (isMounted) {
                setLoadedSections(prev => new Set([...prev, src]))
              }
              resolve(true)
            }
            img.onerror = () => {
              console.warn(`Failed to load image: ${src}`)
              resolve(true) // Continue mesmo com erro
            }
            img.src = src
          })
        )

        await Promise.all(imagePromises)

        // Aguardar componentes críticos estarem prontos
        await new Promise(resolve => setTimeout(resolve, 200))

        if (isMounted) {
          onSectionsLoaded()
        }

      } catch (error) {
        console.error('Error preloading sections:', error)
        if (isMounted) {
          onSectionsLoaded()
        }
      }
    }

    preloadSections()

    return () => {
      isMounted = false
    }
  }, [onSectionsLoaded])

  return null
}


