import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PlayIcon } from 'lucide-react'
import AnimeDetailsModal from './animeDetailsModel'
import { useAnimeStore } from '@/store/anime-store'
import Link from 'next/link'

export interface IMovie {
  id: string
  title: string
  image: string
  releaseDate: string
}

interface AnimeCardProps {
  movie: IMovie
}

function MovieCard({ movie }: AnimeCardProps) {
  const [open, setOpen] = useState(false)
  const { setAnime } = useAnimeStore()

  return (
    <motion.div className="group relative cursor-pointer rounded-lg overflow-hidden">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg bg-muted">
          <img
            src={movie.image}
            alt={`${movie.title} poster`}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
            <Link href={`/anime/${movie.id}`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-background p-3 rounded-full text-primary hover:bg-primary hover:text-background transition-colors"
                aria-label="Watch Episode"
              >
                <PlayIcon size={24} />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Title and Release Date */}
      <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h4 className="text-base font-semibold text-foreground line-clamp-1" title={movie.title}>
          {movie.title}
        </h4>
        <div className="px-2 py-1 text-sm font-medium rounded-md shadow bg-secondary text-secondary-foreground">
          {movie.releaseDate}
        </div>
      </div>

      {/* Anime Details Modal */}
      <AnimeDetailsModal
        open={open}
        handleCloseModal={() => {
          setAnime(null)
          setOpen(false)
        }}
      />
    </motion.div>
  )
}

export default MovieCard
