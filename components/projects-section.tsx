"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useAnimation, type PanInfo } from "framer-motion"
import { ExternalLink, MessageCircle, Smartphone, Globe, Target } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Dashboard Canabidiol LBS",
    description:
      "Painel de controle completo para empresa do ramo canabidiol, com gestão de produtos, vendas e relatórios em tempo real.",
    longDescription:
      "Sistema completo de gestão empresarial desenvolvido para a Canabidiol LBS, incluindo controle de estoque, dashboard de vendas, relatórios analíticos e integração com sistemas de pagamento. Interface moderna e responsiva com foco na experiência do usuário.",
    tags: ["React", "Node.js", "Dashboard", "Analytics"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hAKUIUEut8yzdz7c72LnKZ7gzLjN8c.png",
    links: {
      demo: "https://dashboard-canabidiollbs.vercel.app/",
      github: "https://wa.me/5511939301589",
    },
    features: ["Controle de Estoque", "Dashboard Analytics", "Relatórios em Tempo Real", "Interface Responsiva"],
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    title: "Site Vitrine - Negócios Locais",
    description:
      "Site vitrine moderno e responsivo para negócios locais, com foco em conversão e experiência do usuário otimizada.",
    longDescription:
      "Desenvolvimento de site vitrine profissional para negócios locais, com design moderno, otimização para SEO, integração com WhatsApp e formulários de contato. Foco total na conversão de visitantes em clientes.",
    tags: ["Next.js", "SEO", "Responsive", "Conversion"],
    image: "/modern-business-website-showcase-with-clean-design.jpg",
    links: {
      demo: "https://wa.me/5511939301589",
      github: "https://wa.me/5511939301589",
    },
    features: ["Design Responsivo", "Otimização SEO", "Integração WhatsApp", "Alta Conversão"],
    color: "from-purple-500/20 to-blue-500/20",
  },
  {
    title: "Painel de Controle de Estoque",
    description:
      "Sistema avançado de controle de estoque com alertas automáticos, relatórios detalhados e integração com vendas.",
    longDescription:
      "Painel completo para gestão de estoque empresarial, incluindo controle de entrada e saída, alertas de estoque baixo, relatórios de movimentação e integração com sistema de vendas. Interface intuitiva e funcionalidades avançadas.",
    tags: ["React", "Database", "Automation", "Reports"],
    image: "/inventory-management-dashboard-with-charts-and-sto.jpg",
    links: {
      demo: "https://wa.me/5511939301589",
      github: "https://wa.me/5511939301589",
    },
    features: ["Controle de Entrada/Saída", "Alertas Automáticos", "Relatórios Detalhados", "Integração Vendas"],
    color: "from-blue-500/20 to-cyan-500/20",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const cardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const handleDragEnd = (event: MouseEvent | TouchEvent, info: PanInfo) => {
  // Handle drag end logic here
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1, fallback: true })
  const controls = useAnimation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    console.log("[v0] Total projects:", projects.length)
    console.log("[v0] Active index:", activeIndex)
    console.log("[v0] Current project:", projects[activeIndex]?.title)
    controls.start("visible")
  }, [controls, activeIndex])

  const getProjectIcon = (index: number) => {
    const icons = [
      <Target key="target" className="w-5 h-5 text-white" />,
      <Globe key="globe" className="w-5 h-5 text-white" />,
      <Smartphone key="smartphone" className="w-5 h-5 text-white" />,
    ]
    return icons[index] || <Globe className="w-5 h-5 text-white" />
  }

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
    setIsExpanded(false)
  }

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setIsExpanded(false)
  }

  const goToProject = (index: number) => {
    setActiveIndex(index)
    setIsExpanded(false)
  }

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(var(--primary),0.1),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
          style={{ opacity: 1 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Meus <span className="text-gradient">Projetos</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto">
            Projetos reais que desenvolvi, mostrando minha experiência em marketing digital e desenvolvimento web
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"
          ></motion.div>
        </motion.div>

        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            <motion.button
              onClick={prevProject}
              className="p-3 rounded-full glass hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <div className="text-center">
              <span className="text-sm text-gray-400">
                {activeIndex + 1} de {projects.length}
              </span>
            </div>

            <motion.button
              onClick={nextProject}
              className="p-3 rounded-full glass hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Project Content with Swipe Support */}
          <div className="overflow-hidden">
            <motion.div
              key={activeIndex}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="grid md:grid-cols-2 gap-8 items-center project-card"
              drag="x"
              dragConstraints={{ left: -100, right: 100 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 0.95 }}
            >
              <div className="order-2 md:order-1">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                  style={{ opacity: 1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      {getProjectIcon(activeIndex)}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold">{projects[activeIndex].title}</h3>
                  </div>

                  <motion.p
                    className="text-gray-300"
                    initial={{ height: "auto" }}
                    animate={{ height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    {isExpanded ? projects[activeIndex].longDescription : projects[activeIndex].description}
                  </motion.p>

                  <motion.button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-sm text-primary hover:text-secondary transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {isExpanded ? "Ver menos" : "Ler mais"}
                  </motion.button>

                  <div className="flex flex-wrap gap-2">
                    {projects[activeIndex].tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full glass border border-primary/20"
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <h4 className="text-lg font-medium">Principais Funcionalidades</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {projects[activeIndex].features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-300"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          style={{ opacity: 1 }}
                        >
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                      href={projects[activeIndex].links.demo}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass bg-primary/10 hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={16} />
                      Ver Projeto
                    </motion.a>
                    <motion.a
                      href={projects[activeIndex].links.github}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass hover:bg-card/50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={16} />
                      Falar no WhatsApp
                    </motion.a>
                  </div>
                </motion.div>
              </div>

              <div className="order-1 md:order-2">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  className="gradient-border p-1 rounded-2xl overflow-hidden"
                  style={{ opacity: 1 }}
                >
                  <div className={`rounded-xl overflow-hidden bg-gradient-to-br ${projects[activeIndex].color} p-4`}>
                    <motion.div
                      whileHover={{ scale: 1.03, rotate: 1 }}
                      transition={{ duration: 0.3 }}
                      className="neomorphic overflow-hidden rounded-lg"
                    >
                      <Image
                        src={projects[activeIndex].image || "/placeholder.svg"}
                        alt={projects[activeIndex].title}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToProject(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? "bg-primary scale-125" : "bg-gray-600 hover:bg-gray-500"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-heading font-bold mb-8 text-center">Todos os Projetos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                onClick={() => goToProject(index)}
                className={`cursor-pointer rounded-xl overflow-hidden glass p-4 transition-all ${
                  index === activeIndex ? "ring-2 ring-primary" : "hover:bg-card/50"
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium mb-2">{project.title}</h4>
                <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
