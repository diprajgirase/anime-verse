import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PlayIcon } from 'lucide-react'
import AnimeDetailsModal from './animeDetailsModel'
import { useAnimeStore } from '@/store/anime-store'
import { getWishlistAnime } from '@/utils/anime'
import { IEpisodes } from './animeCarousel'

interface AnimeCardProps {
  episode: IEpisodes
}

function EpisodeCard({ episode }: AnimeCardProps) {
  const [open, setOpen] = useState(false)
  const { setAnime } = useAnimeStore()

  console.log('episode', episode)

  useEffect(() => {
    const localAnime = getWishlistAnime()
    const animeIds = localAnime.map((anime) => anime.id)
    if (animeIds.includes(episode.id)) {
      console.log(`Episode ${episode.id} is in the wishlist`)
    }
  }, [episode.id])

  const handleRedirect = async () => {
    try {
      const response = await fetch(`/api/anime/${episode.id}`, {
        cache: 'no-cache',
      })
      const data = await response.json()
      setAnime(data)
    } catch (error: any) {
      console.error('Error fetching anime details:', error.message)
    }
  }

  return (
    <motion.div className="group relative cursor-pointer rounded-lg overflow-hidden">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg bg-muted">
          <img
            src={episode.poster}
            alt={`${episode.name} poster`}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                handleRedirect()
                setOpen(true)
              }}
              className="bg-background p-3 rounded-full text-primary hover:bg-primary hover:text-background transition-colors"
              aria-label="Watch Episode"
            >
              <PlayIcon size={24} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Title and Episode Number */}
      <div className="mt-3 grid grid-cols-5">
        <h4
          className="text-base font-semibold col-span-4 text-foreground line-clamp-1"
          title={episode.name}
        >
          {episode.name}
        </h4>
        <div className="px-2 py-1 col-span-1 text-sm font-medium rounded-md shadow bg-secondary text-secondary-foreground">
          {episode.type}
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

export default EpisodeCard
