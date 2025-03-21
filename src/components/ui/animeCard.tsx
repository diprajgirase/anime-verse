import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PlayIcon, SaveIcon, CheckCircleIcon } from 'lucide-react'
import AnimeDetailsModal from './animeDetailsModel'
import { useAnimeStore } from '@/store/anime-store'
import { getWishlistAnime } from '@/utils/anime'
import Link from 'next/link'

interface IAnime {
  id: string
  name: string
  poster: string
  type?: string
}

interface IAnimeCardProps {
  anime: IAnime
}

function AnimeCard({ anime }: IAnimeCardProps) {
  const [open, setOpen] = useState(false)
  const [animeIds, setAnimeIds] = useState<string[]>([])
  const { anime: fullAnime, setAnime } = useAnimeStore()
  console.log(anime)

  useEffect(() => {
    const localAnime = getWishlistAnime()
    setAnimeIds(localAnime.map((anime) => anime.id))
  }, [])

  return (
    <motion.div className="group relative cursor-pointer rounded-lg overflow-hidden">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <div className="bg-muted aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
          <img
            src={anime.poster}
            alt={`${anime.name} poster`}
            className="object-cover w-full h-full transition-transform group-hover:scale-110 duration-300"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
            <Link href={`/anime/${anime.id}`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-background/90 p-3 rounded-full hover:bg-primary text-foreground hover:text-background"
                aria-label="Watch Episode"
              >
                <PlayIcon size={24} />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-background/90 p-3 rounded-full ${
                animeIds.includes(anime.id)
                  ? 'hover:bg-success hover:text-background'
                  : 'hover:bg-secondary hover:text-secondary-foreground'
              }`}
              aria-label={animeIds.includes(anime.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              {animeIds.includes(anime.id) ? <CheckCircleIcon size={24} /> : <SaveIcon size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Title and Episode Number */}
      <div className="mt-3 grid grid-cols-4">
        <div className="pr-2 col-span-3">
          <h4 className="text-base font-semibold text-foreground line-clamp-1">{anime.name}</h4>
        </div>
        <div className="flex justify-end">
          <div className="bg-accent text-accent-foreground text-sm font-medium px-2 py-1 rounded-md shadow-sm line-clamp-1">
            <span className="font-bold">{anime.type}</span>
          </div>
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

export default AnimeCard
