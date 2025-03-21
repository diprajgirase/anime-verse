'use client'
import * as React from 'react'

import Hero from '@/components/Hero'
import AnimeCarousel from '@/components/ui/animeCarousel'
import { useGetHomePageData } from '@/query/get-home-page-data'
import type { IEpisodes } from '@/types/episodes'

interface AnimeData {
  trendingAnimes: unknown
  latestCompletedAnimes: unknown
  latestEpisodeAnimes: IEpisodes[] | undefined
  topUpcomingAnimes: unknown
  recentlyAddedEpisodes: {
    results: any[]
  }
  recentlyAddedMovies: {
    results: any[]
  }
  mostPopularAnimes: any[]
  topAiringAnimes: any[]
}

export default function HomePage() {
  const { data, isLoading, isError } = useGetHomePageData() as {
    data: AnimeData | undefined
    isLoading: boolean
    isError: boolean
  }

  if (isLoading) {
    return <div className="space-y-8 p-4">Loading...</div>
  }

  if (isError) {
    return <>Error... Something went wrong</>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted text-foreground">
      <div className="relative">
        <Hero
          backgroundImage="https://p325k7wa.twic.pics/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/01-news/jjkcc-character-trailer-1.jpg?twic=v1/resize=1080/step=10/quality=100"
          title="Jujutsu kaisen"
          description="Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at either the clubroom or the hospital, where he visits his bedridden grandfather. However, this leisurely lifestyle soon takes a turn for the strange when he unknowingly encounters a cursed item."
        />
      </div>

      <div className="container mx-auto space-y-8 md:space-y-12 py-8 px-4 md:px-0 overflow-hidden">
        <div>
          <AnimeCarousel
            animes={data?.trendingAnimes}
            category="Trending animes"
            isLoading={false}
          />
        </div>
        <div>
          <AnimeCarousel
            animes={data?.latestCompletedAnimes}
            category="Latest completed anime"
            isLoading={false}
          />
        </div>

        <div>
          <AnimeCarousel
            // @ts-ignore
            episodes={data?.latestEpisodeAnimes}
            category="Latest animes episode"
            isEpisodes={true}
            isLoading={false}
          />
        </div>

        <div>
          <AnimeCarousel
            animes={data?.topUpcomingAnimes}
            category="Upcoming animes"
            isLoading={false}
          />
        </div>

        <div>
          <AnimeCarousel
            animes={data?.mostPopularAnimes}
            category="Most Popular"
            isLoading={false}
          />
        </div>

        <div>
          <AnimeCarousel animes={data?.topAiringAnimes} category="Top Airing" isLoading={false} />
        </div>
      </div>
    </div>
  )
}
