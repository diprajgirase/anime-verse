'use client'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { api } from '@/lib/api'
import { ScrollArea } from './ui/scroll-area'

interface IAnime {
  id: string
  title: string
  url: string
  image: string
  duration: string
  japaneseTitle: string
  type: string
  nsfw: boolean
  sub: number
  dub: number
  episodes: number
}

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [query, setQuery] = useState('')
  const [animeData, setAnimeData] = useState<IAnime[]>([])
  const inputRef = useRef(null)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false)
    }, 200)
  }

  useEffect(() => {
    function fetchSearch() {
      if (query.trim().length > 3) {
        api
          .get('/anime/search' + '?q=' + query)
          .then((response: any) => setAnimeData(response.data.results))
          .catch((error: unknown) => {
            if (error instanceof Error) {
              console.error('error while fetching the search data:', error)
            } else {
              console.error('something went wrong.', error)
            }
          })
      }
    }
    const fetchTimeout = setTimeout(fetchSearch, 500)
    return () => clearTimeout(fetchTimeout)
  }, [query])

  return (
    <div className="relative w-full sm:w-96 flex justify-end">
      <Input
        ref={inputRef}
        placeholder="Search for anime..."
        className="w-full sm:w-60 focus:sm:w-96 transition-all text-muted-foreground focus:text-foreground duration-200 bg-muted hover:bg-muted/80 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isFocused && (
        <motion.div
          initial={{
            y: 10,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.2,
          }}
          className="absolute w-full sm:w-96 mt-2 h-96 overflow-y-auto bg-popover shadow-lg rounded-md top-10"
        >
          <ScrollArea>
            {animeData?.length < 1 ? (
              <div className="flex justify-center items-center h-full p-5">
                <p className="text-muted-foreground">No results found</p>
              </div>
            ) : (
              animeData?.map((anime) => (
                <Link
                  key={anime.id}
                  href={`/anime/${anime.id}`}
                  className="grid grid-cols-4 gap-4 p-4 hover:bg-accent transition-colors duration-200"
                >
                  <div className="col-span-1 w-full relative h-24 rounded-md overflow-hidden">
                    <img
                      src={anime?.image}
                      alt={anime?.title}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="col-span-3">
                    <h3 className="text-base font-medium text-foreground">{anime?.title}</h3>
                    <p className="text-xs text-muted-foreground">Duration: {anime?.duration}</p>
                    <p className="text-xs text-muted-foreground">Episodes: {anime?.sub}</p>
                  </div>
                </Link>
              ))
            )}
          </ScrollArea>
        </motion.div>
      )}
    </div>
  )
}

export default SearchBar
