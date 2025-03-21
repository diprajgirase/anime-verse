'use client'
import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Info, Fullscreen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface HeroProps {
  backgroundImage: string
  title: string
  description: string
}

const Hero: React.FC<HeroProps> = ({ backgroundImage, title, description }) => {
  const divRef = useRef(null)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const enterFullScreen = () => {
    const element = divRef.current
    if (element) {
      // @ts-ignore
      if (element.requestFullscreen) {
        // @ts-ignore
        element.requestFullscreen()
      } else if ((element as any).mozRequestFullScreen) {
        ;(element as any).mozRequestFullScreen()
      } else if ((element as any).webkitRequestFullscreen) {
        ;(element as any).webkitRequestFullscreen()
      } else if ((element as any).msRequestFullscreen) {
        ;(element as any).msRequestFullscreen()
      }
    }
  }

  return (
    <motion.div
      className="relative min-h-[35vh]   md:min-h-[50vh] md:h-[80vh] bg-cover bg-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      ref={divRef}
    >
      <motion.div
        className="h-full bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(to bottom,
               rgba(0,0,0,0.0) 50%,
              rgba(0, 0, 0, 1) 100%
            ),
            url(${backgroundImage})
          `,
        }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="absolute bottom-4 md:bottom-14 left-4 md:left-14 p-2  md:p-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-2xl md:text-4xl font-bold text-primary mb-2"
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-sm md:text-base tracking-wide text-justify max-w-[280px] sm:max-w-md md:max-w-xl mb-4 md:mb-6 text-gray-300 line-clamp-3 md:line-clamp-4"
          variants={itemVariants}
        >
          {description}
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-2 sm:gap-4" variants={itemVariants}>
          <Link href={'/anime/jujutsu-kaisen-tv-dub/jujutsu-kaisen-tv-dub-episode-1'}>
            <Button
              asChild
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Play className="mr-2 h-4 w-4" /> Watch Now
              </motion.button>
            </Button>
          </Link>

          <Link href={'/anime/jujutsu-kaisen-tv-dub'}>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Info className="mr-2 h-4 w-4" /> More Info
              </motion.button>
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
        <Button size="icon" variant="outline" onClick={enterFullScreen}>
          <Fullscreen className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default Hero
