'use client'
import { useParams } from 'next/navigation'

import { AnimeHeader } from '@/components/anime/AnimeHeader'
import { AnimeStats } from '@/components/anime/AnimeStats'
import { MediaSection } from '@/components/anime/MediaSection'
import { RelatedAnime } from '@/components/anime/RelatedAnime'
import { Card } from '@/components/ui/card'
import { useGetAnimeDetailsData } from '@/query/get-anime-details'
import type { AnimeData } from '@/types/anime'

export default function AnimeDetails() {
  const { animeId } = useParams<{ animeId: string }>()
  const { data: anime, isLoading, isError } = useGetAnimeDetailsData(animeId)

  if (isError) {
    return <div>Error... Something went wrong</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 space-y-8">
      <AnimeHeader anime={anime.anime.info} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <MediaSection anime={anime.anime.info} />
          <RelatedAnime animes={anime.relatedAnimes} />
        </div>

        <div className="space-y-8">
          <AnimeStats anime={anime.anime.info} />
          <VoiceActorsSection voiceActors={anime.anime.info.charactersVoiceActors} />
        </div>
      </div>
    </div>
  )
}

// @ts-ignore
function VoiceActorsSection({ voiceActors }: { voiceActors: AnimeData['charactersVoiceActors'] }) {
  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Voice Cast</h2>
      <div className="space-y-4">
        {voiceActors?.map(({ character, voiceActor }: any) => (
          <div key={character.name} className="flex items-center gap-4">
            <img
              src={character.poster}
              alt={character.name}
              className="size-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{character.name}</p>
              <p className="text-sm text-muted-foreground">{voiceActor.name}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
