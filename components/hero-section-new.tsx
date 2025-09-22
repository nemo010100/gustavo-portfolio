"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import LiquidButton from "./liquid-button"

export default function HeroSectionNew() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  // Componentes SVG dos ícones reais
  const JavaScriptIcon = () => (
    <svg width="40" height="40" viewBox="0 0 256 256" className="drop-shadow-lg">
      <rect width="256" height="256" fill="#F7DF1E" rx="28"/>
      <path d="m67.312 213.932 19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996m85.07-2.576 19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574" fill="#323330"/>
    </svg>
  )

  const PythonIcon = () => (
    <svg width="40" height="40" viewBox="0 0 256 255" className="drop-shadow-lg">
      <defs>
        <linearGradient id="pythonBlue" x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%">
          <stop offset="0%" stopColor="#387EB8"/>
          <stop offset="100%" stopColor="#366994"/>
        </linearGradient>
        <linearGradient id="pythonYellow" x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%">
          <stop offset="0%" stopColor="#FFE052"/>
          <stop offset="100%" stopColor="#FFC331"/>
        </linearGradient>
      </defs>
      <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="url(#pythonBlue)"/>
      <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="url(#pythonYellow)"/>
    </svg>
  )

  const ReactIcon = () => (
    <svg width="40" height="40" viewBox="0 0 256 228" className="drop-shadow-lg">
      <path d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488C219.616 145.793 256 129.291 256 113.668c0-15.323-17.818-30.417-45.517-39.844zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345-3.24-10.257-7.612-21.163-12.963-32.432 5.106-11 9.31-21.767 12.459-31.957 2.619.758 5.16 1.557 7.61 2.4 23.69 8.156 38.14 20.213 38.14 29.504 0 9.896-15.606 22.743-40.946 31.14zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787-1.524 8.219-4.59 13.698-8.382 15.893-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246 12.376-1.098 24.068-2.894 34.671-5.345.522 2.107.986 4.173 1.386 6.193zM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994 7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94zM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863-6.35-5.437-9.555-10.836-9.555-15.216 0-9.322 13.897-21.212 37.076-29.293 2.813-.98 5.757-1.905 8.812-2.773 3.204 10.42 7.406 21.315 12.477 32.332-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789 8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18zM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152 7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793 2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433 4.902.192 9.899.29 14.978.29 5.218 0 10.376-.117 15.453-.343-4.985 6.774-10.018 12.97-15.028 18.486zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026 347.403 347.403 0 0 0 7.425-13.565zM128.181 109.28c-8.835 0-16.01-7.174-16.01-16.009s7.175-16.009 16.01-16.009c8.836 0 16.01 7.174 16.01 16.009s-7.174 16.009-16.01 16.009z" fill="#61DAFB"/>
    </svg>
  )

  const HTMLIcon = () => (
    <svg width="40" height="40" viewBox="0 0 256 361" className="drop-shadow-lg">
      <path d="m255.555 70.766-23.241 260.36-104.47 28.962-104.182-28.922L.445 70.766h255.11z" fill="#E44D26"/>
      <path d="m128 337.95 84.417-23.403 19.86-222.49H128V337.95z" fill="#F16529"/>
      <path d="M82.82 155.932H128v-31.937H47.917l.764 8.568 7.85 88.01H128v-31.937H85.739l-2.919-32.704zM90.018 236.542h-32.06l4.474 50.146 65.421 18.16.147-.04V271.58l-.14.037-35.568-9.604-2.274-25.471z" fill="#EBEBEB"/>
      <path d="M24.18 0h16.23v16.035h14.847V0h16.231v48.558H55.257v-16.26H40.411v16.26h-16.23V0zM92.83 16.103H78.544V0h44.814v16.103h-14.295v32.455h-16.23V16.103h-.001zM130.47 0h16.923l10.41 17.062L168.203 0h16.93v48.558h-16.164V24.49l-11.166 17.265h-.28L146.35 24.49v24.068h-15.88V0zM193.21 0h16.235v32.508h22.824v16.05h-39.06V0z" fill="#000"/>
      <path d="M127.89 220.573h39.327l-3.708 41.42-35.62 9.614v33.226l65.473-18.145.48-5.396 7.506-84.08.779-8.576H127.89v31.937zM127.89 155.854v.078h77.143l.64-7.178 1.456-16.191.763-8.568H127.89v31.86z" fill="#FFF"/>
    </svg>
  )

  const CSSIcon = () => (
    <svg width="40" height="40" viewBox="0 0 256 361" className="drop-shadow-lg">
      <path d="m127.844 360.088-104.596-28.958L.078 70.734h255.844l-23.25 260.358-104.828 28.996z" fill="#264de4"/>
      <path d="M212.417 314.005 128 337.96 43.716 314.005l-18.78-210.048H128v233.85l84.417-23.403 18.86-210.447H128V70.734h127.922l-1.824 20.425-3.657 40.972-13.24 148.464-84.44 23.372V70.734l-.261.001z" fill="#2965f1"/>
      <path d="M53.669 188.636 56.95 225.441H128v-36.805H53.669zM47.917 123.995l3.274 36.641H128v-36.641H47.917zM128 271.58l-.14.037-35.568-9.604-2.274-25.471h-36.46l4.474 50.146 65.421 18.16.147-.04V271.58z" fill="#ebebeb"/>
      <path d="M160.758 188.636H127.89v36.805h29.911l-2.973 33.299-26.938 7.266v34.242l49.533-13.732.364-4.075 5.694-63.805.592-6.627.131-14.107zM127.89 123.995v36.641h69.417l.579-6.419 1.32-14.607.691-7.615H127.89z" fill="#fff"/>
    </svg>
  )

  const NodeIcon = () => (
    <svg width="40" height="40" viewBox="0 0 256 282" className="drop-shadow-lg">
      <g fill="#689F63">
        <path d="M116.504 3.58c6.962-3.985 16.03-4.003 22.986 0 34.995 19.774 70.001 39.517 104.99 59.303 6.581 3.707 10.983 11.031 10.916 18.614v118.968c.049 7.897-4.788 15.396-11.731 19.019-34.88 19.665-69.742 39.354-104.616 59.019-7.106 4.063-16.356 3.75-23.24-.646-10.457-6.062-20.932-12.094-31.39-18.15-2.137-1.274-4.546-2.288-6.055-4.36 1.334-1.798 3.719-2.022 5.657-2.807 4.365-1.388 8.374-3.616 12.384-5.778 1.014-.694 2.252-.428 3.224.193 8.942 5.127 17.805 10.403 26.777 15.481 1.914 1.105 3.852-.362 5.488-1.274 34.228-19.345 68.498-38.617 102.72-57.968 1.268-.61 1.969-1.956 1.866-3.345.024-39.245.006-78.497.012-117.742.145-1.576-.767-3.025-2.192-3.67-34.759-19.575-69.5-39.18-104.253-58.76a3.621 3.621 0 0 0-4.094-.006C91.2 39.257 56.465 58.88 21.712 78.454c-1.42.646-2.373 2.071-2.204 3.653.006 39.245 0 78.497 0 117.748a3.329 3.329 0 0 0 1.89 3.303c9.274 5.259 18.56 10.481 27.84 15.722 5.228 2.814 11.647 4.486 17.407 2.33 5.083-1.823 8.646-7.01 8.549-12.407.048-39.016-.024-78.038.036-117.048-.127-1.732 1.516-3.163 3.2-3 4.456-.03 8.918-.06 13.374.012 1.86-.042 3.14 1.823 2.91 3.568-.018 39.263.048 78.527-.03 117.79.012 10.464-4.287 21.85-13.966 26.97-11.924 6.177-26.662 4.867-38.442-1.056-10.198-5.09-19.93-11.097-29.947-16.55C5.368 215.886.555 208.357.604 200.466V81.497C.707 73.757 5.229 66.335 11.73 62.760 46.606 43.027 81.502 23.340 116.504 3.58z"/>
        <path d="M146.928 85.99c15.21-.979 31.493-.58 45.18 6.913 10.597 5.742 16.472 17.793 16.659 29.566-.296 1.588-1.956 2.464-3.472 2.355-4.413-.006-8.827.06-13.24-.03-1.872.072-2.96-1.654-3.195-3.309-1.268-5.633-4.34-11.212-9.642-13.929-8.139-4.075-17.576-3.87-26.451-3.785-6.479.344-13.446.905-18.935 4.715-4.214 2.886-5.494 8.712-3.99 13.404 1.418 3.369 5.307 4.456 8.489 5.458 18.33 4.794 37.754 4.317 55.734 10.626 7.444 2.572 14.726 7.572 17.274 15.366 3.333 10.446 1.872 22.932-5.56 31.318-6.027 6.901-14.805 10.657-23.56 12.697-11.647 2.597-23.734 2.663-35.562 1.51-11.122-1.268-22.696-4.19-31.282-11.768-7.342-6.375-10.928-16.308-10.572-25.895.085-1.619 1.697-2.748 3.248-2.615 4.444-.036 8.888-.048 13.332.006 1.775-.127 3.091 1.407 3.182 3.08.82 5.367 2.837 11 7.517 14.182 9.032 5.827 20.365 5.428 30.707 5.591 8.568-.38 18.186-.495 25.178-6.158 3.689-3.23 4.782-8.634 3.785-13.283-1.08-3.925-5.186-5.754-8.712-6.95-18.095-5.724-37.736-3.647-55.656-10.12-7.275-2.571-14.31-7.432-17.105-14.906-3.9-10.578-2.113-23.662 6.098-31.765 8.006-8.06 19.563-11.164 30.551-12.275z"/>
      </g>
    </svg>
  )

  // Array de tecnologias com seus ícones SVG
  const techIcons = [
    { name: "JavaScript", component: JavaScriptIcon, color: "#F7DF1E" },
    { name: "Python", component: PythonIcon, color: "#3776AB" },
    { name: "React", component: ReactIcon, color: "#61DAFB" },
    { name: "Node.js", component: NodeIcon, color: "#339933" },
    { name: "HTML", component: HTMLIcon, color: "#E34F26" },
    { name: "CSS", component: CSSIcon, color: "#1572B6" },
  ]

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image - Full Screen */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/background-photo.jpg')`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          width: '100%',
          height: '100%'
        }}
      >
        {/* Overlay escuro para destacar o conteúdo */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Floating Tech Icons - Melhor animação */}
      <div className="absolute inset-0 z-5">
        {techIcons.map((tech, index) => {
          const TechComponent = tech.component
          return (
            <motion.div
              key={tech.name}
              className="absolute"
              style={{
                left: `${15 + (index * 12)}%`,
                top: `${20 + (index % 2) * 40}%`,
              }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4 + index,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            >
              <div 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20"
                style={{ 
                  boxShadow: `0 0 20px ${tech.color}40`,
                }}
              >
                <TechComponent />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Floating Particles - Simplificado */}
      <div className="absolute inset-0 z-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content Layer */}
      <motion.div
        style={{ opacity, y }} 
        className="relative z-10 w-full h-full flex items-center justify-start pl-8 lg:pl-20"
      >
        <div className="max-w-2xl">
          {/* Título Principal com animações épicas */}
          <div className="mb-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight overflow-hidden">
              {/* DESENVOLVEDOR */}
              <motion.span 
                className="block"
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.5,
                  ease: [0.175, 0.885, 0.32, 1.275],
                  type: "spring",
                  stiffness: 100
                }}
              >
                <span className="inline-block bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent font-black tracking-wider">
                  {"DESENVOLVEDOR".split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={{ opacity: 0, y: 50, rotateY: 90 }}
                      animate={{ opacity: 1, y: 0, rotateY: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.7 + i * 0.08,
                        ease: "easeOut"
                      }}
                      whileHover={{
                        scale: 1.1,
                        color: "#00e1f4",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </motion.span>

              {/* WEB */}
              <motion.span 
                className="block"
                initial={{ opacity: 0, x: -200, rotateZ: -45 }}
                animate={{ opacity: 1, x: 0, rotateZ: 0 }}
                transition={{ 
                  duration: 1.5, 
                  delay: 1.5,
                  ease: [0.68, -0.55, 0.265, 1.55],
                  type: "spring",
                  stiffness: 120
                }}
              >
                <span className="inline-block relative">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-black tracking-[0.2em]">
                    {"WEB".split("").map((letter, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        initial={{ opacity: 0, scale: 0, rotateX: 180 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 2 + i * 0.15,
                          ease: "easeOut"
                        }}
                        whileHover={{
                          scale: 1.2,
                          rotateY: 180,
                          color: "#8b5cf6",
                          transition: { duration: 0.3 }
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                  
                  {/* Efeito de underline animado */}
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 1, delay: 2.5, ease: "easeOut" }}
                  />
                </span>
              </motion.span>
            </h1>
          </div>

          {/* Subtítulo com efeitos de typing */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3 }}
          >
            <div className="text-xl lg:text-2xl font-light flex flex-wrap items-center gap-2">
              {/* Sites */}
              <motion.span
                className="relative"
                initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.6, delay: 3.2, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.2 } 
                }}
              >
                <span className="relative z-10 text-cyan-400 font-medium px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-sm">
                  Sites
                </span>
                <motion.div
                  className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"
        animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.span>

              {/* Bullet point animado */}
              <motion.span
                className="text-gray-400 font-bold text-2xl"
                initial={{ opacity: 0, rotate: 180, scale: 0 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 3.4, ease: "easeOut" }}
              >
                •
              </motion.span>

              {/* Automação */}
              <motion.span
                className="relative"
                initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.6, delay: 3.6, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.2 } 
                }}
              >
                <span className="relative z-10 text-green-400 font-medium px-3 py-1 rounded-full border border-green-400/30 bg-green-400/10 backdrop-blur-sm">
                  Automação
                </span>
          <motion.div
                  className="absolute inset-0 bg-green-400/20 rounded-full blur-md"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.7,
                    ease: "easeInOut"
                  }}
                />
              </motion.span>

              {/* Bullet point animado */}
              <motion.span
                className="text-gray-400 font-bold text-2xl"
                initial={{ opacity: 0, rotate: 180, scale: 0 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 3.8, ease: "easeOut" }}
              >
                •
              </motion.span>

              {/* Soluções */}
              <motion.span
                className="relative"
                initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.6, delay: 4, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.2 } 
                }}
              >
                <span className="relative z-10 text-yellow-400 font-medium px-3 py-1 rounded-full border border-yellow-400/30 bg-yellow-400/10 backdrop-blur-sm">
                  Soluções
                </span>
                <motion.div
                  className="absolute inset-0 bg-yellow-400/20 rounded-full blur-md"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1.4,
                    ease: "easeInOut"
                  }}
                />
              </motion.span>
            </div>
          </motion.div>

          {/* Descrição com efeito de typewriter */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 4.5 }}
          >
            <div className="text-lg text-gray-300 max-w-lg leading-relaxed">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, delay: 4.7, ease: "easeOut" }}
                className="inline-block overflow-hidden whitespace-nowrap"
              >
                Criando experiências digitais incríveis e automatizando processos 
                para empresas que querem se destacar no digital.
              </motion.span>
              
              {/* Cursor piscando */}
              <motion.span
                className="inline-block w-0.5 h-5 bg-cyan-400 ml-1"
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 6.7,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* CTA Button com efeitos premium */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 5,
              ease: [0.175, 0.885, 0.32, 1.275]
            }}
          >
            <LiquidButton 
              size="lg" 
              onClick={() => window.scrollTo({ top: document.getElementById('contact')?.offsetTop, behavior: 'smooth' })}
            >
              Vamos Conversar
            </LiquidButton>
            </motion.div>
        </div>
      </motion.div>
    </section>
  )
}