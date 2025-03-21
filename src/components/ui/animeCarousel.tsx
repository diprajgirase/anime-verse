'use client'
import AnimeCard from './animeCard'
import AnimeCardLoading from './animeCardLoading'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel'
import EpisodeCard from './episodeCard'
import type { IMovie } from './movieCard'
import MovieCard from './movieCard'

export interface IEpisodes {
  id: string
  episodeId: string
  episodeNumber: number
  title: string
  image: string
  url: string
}

interface IAnimeCarouselProps {
  animes?: any
  movies?: IMovie[]
  isMovie?: boolean
  category: string
  episodes?: IEpisodes[]
  isLoading: boolean
  isEpisodes?: boolean
}

function AnimeCarousel({
  animes,
  movies,
  episodes,
  category,
  isLoading = false,
  isEpisodes = false,
  isMovie = false,
}: IAnimeCarouselProps) {
  return (
    <div className="px-0 pb-3 pt-0 md:py-8 border-b border-border">
      <h2 className="text-2xl font-bold mb-4 text-primary">{category}</h2>

      <div>
        {/* Anime Carousel */}
        <Carousel className="w-full">
          <CarouselContent>
            {isLoading
              ? Array.from({ length: 10 })
                  .fill('')
                  .map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 gap-4"
                    >
                      <AnimeCardLoading />
                    </CarouselItem>
                  ))
              : isEpisodes
                ? episodes?.map((episode: IEpisodes, index: number) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 gap-4"
                  >
                    <EpisodeCard key={index} episode={episode} />
                  </CarouselItem>
                ))
                : isMovie
                  ? movies?.map((movie: IMovie, index: number) => (
                    <CarouselItem
                      key={index}
                      className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 gap-4"
                    >
                      <MovieCard key={index} movie={movie} />
                    </CarouselItem>
                  ))
                  : animes?.map((anime: any, index: number) => (
                    <CarouselItem
                      key={index}
                      className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 gap-4"
                    >
                      <AnimeCard key={index} anime={anime} />
                    </CarouselItem>
                  ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default AnimeCarousel
