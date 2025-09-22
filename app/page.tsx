"use client"
import { useState, useEffect } from "react"
import FloatingSidebar from "@/components/floating-sidebar"
import HeroSectionNew from "@/components/hero-section-new"
import ServicesSection from "@/components/services-section-visual"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import AIChatSection from "@/components/ai-chat-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import ScrollAnimations from "@/components/scroll-animations"
import GlobalBackground from "@/components/global-background"
import SectionIndicators from "@/components/section-indicators"
import SmoothScroll from "@/components/smooth-scroll"
import LoadingScreen from "@/components/loading-screen"
import SimpleLoading from "@/components/simple-loading"
import CursorEffects from "@/components/cursor-effects"
import ScrollEffects from "@/components/scroll-effects"
import FloatingActionMenu from "@/components/floating-action-menu"
import SoundEffects from "@/components/sound-effects"

export default function Home() {
  const [showLoading, setShowLoading] = useState(true)
  
  // Limpar qualquer cache que possa interferir
  useEffect(() => {
    console.log('Page component mounted, showLoading:', showLoading)
    // Limpar sessionStorage para garantir loading na primeira visita
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('hasVisited')
    }
  }, [])

  // Callback quando o loading terminar
  const handleLoadingComplete = () => {
    console.log('Loading completed!')
    setTimeout(() => {
      setShowLoading(false)
    }, 500)
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      {showLoading && <SimpleLoading onComplete={handleLoadingComplete} />}
      
      {/* Efeitos globais otimizados */}
      <CursorEffects />
      <ScrollEffects />
      <FloatingActionMenu />
      <SoundEffects />
      
      <SmoothScroll />
      <GlobalBackground />
      <FloatingSidebar />
      <SectionIndicators />
      
      {/* Seções críticas - carregamento direto após loading screen */}
      <div style={{ 
        opacity: showLoading ? 0 : 1, 
        transition: showLoading ? 'none' : 'opacity 1.2s ease 0.3s',
        pointerEvents: showLoading ? 'none' : 'auto',
        transform: showLoading ? 'translateY(20px)' : 'translateY(0)',
      }}>
        <HeroSectionNew />
        <AboutSection />
      </div>
      
      {/* Outras seções - carregamento normal */}
      <ServicesSection />
      <ProjectsSection />
      <AIChatSection />
      <ContactSection />
      <Footer />
      <ScrollAnimations />
    </main>
  )
}
