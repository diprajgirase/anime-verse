'use client'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/select'
import { useGetGenres } from '@/query/get-genres'
import { useGetGenreData } from '@/query/get-genre-data'
import AnimeCardLoading from '@/components/ui/animeCardLoading'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter, useSearchParams } from 'next/navigation'
import AnimeCard from '@/components/ui/animeCard'
import AnimePagination from '@/components/explore/AnimePagination'

export default function ExplorePage() {
  const router = useRouter()
  const { data: genres, isLoading: isGenresLoading } = useGetGenres()
  const searchParams = useSearchParams()
  const genre = searchParams.get('q') || 'action'
  const page = searchParams.get('page') || '1'

  const {
    data: genreData,
    refetch,
    isRefetching: isGenreDataFetching,
    isLoading: isGenreDataLoading,
  } = useGetGenreData(genre, page)

  async function handleGenreChange(value: string) {
    router.push(`/explore?q=${value}&page=1`)
    setTimeout(refetch, 800)
  }

  const isLoading = isGenreDataLoading || isGenreDataFetching

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 pt-0 sm:pt-0 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            Explore - <span className="capitalize">{genre}</span>
          </h2>

          {isGenresLoading ? (
            <Skeleton className="h-10 w-[150px]" />
          ) : (
            <Select
              defaultValue={genre || (genres && genres[0].id)}
              onValueChange={handleGenreChange}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Genres" />
              </SelectTrigger>
              <SelectContent>
                {genres?.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id} className="capitalize">
                    {genre.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          <AnimatePresence mode="wait">
            {isLoading
              ? Array(20)
                  .fill('')
                  .map((_, index) => <AnimeCardLoading key={index} />)
              : genreData?.results?.map((anime: any, index: number) => (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.3,
                        delay: index * 0.05,
                      },
                    }}
                    exit={{ y: 20, opacity: 0 }}
                    key={anime.id || index}
                  >
                    <AnimeCard anime={anime} />
                  </motion.div>
                ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <div className="py-4">
          <AnimePagination
            hasNextPage={genreData?.hasNextPage || false}
            currentPage={genreData?.currentPage || 1}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  )
}
