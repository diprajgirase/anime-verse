'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import Link from 'next/link'
import { IAnime, IEpisode } from './AnimeBottomSection'

interface IEpisodesListProps {
  anime: IAnime
  episodesPerPage?: number
  animeId: string
}

export function EpisodesList({ anime, episodesPerPage = 32, animeId }: IEpisodesListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil((anime?.episodes?.length || 0) / episodesPerPage)

  const indexOfLastEpisode = currentPage * episodesPerPage
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage
  const currentEpisodes = anime?.episodes?.slice(indexOfFirstEpisode, indexOfLastEpisode) || []

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <motion.div
      className="mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl text-primary">Episodes</CardTitle>
          <CardDescription className="text-muted-foreground">
            Watch all episodes of {anime?.title}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-4">
            {currentEpisodes?.map((episode: IEpisode) => (
              <EpisodeCard episode={episode} key={episode.id} animeId={animeId} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:space-x-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-full sm:w-auto"
            >
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-full sm:w-auto"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function EpisodeCard({ episode, animeId }: { episode: IEpisode; animeId: string }) {
  return (
    <Link
      href={`/anime/${animeId}/${episode.id}`}
      className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div
        key={episode?.id}
        className="flex items-center justify-center p-3 sm:p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
      >
        <div>
          <h3 className="font-semibold text-secondary-foreground">{episode?.number}</h3>
        </div>
      </div>
    </Link>
  )
}
