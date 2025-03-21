'use client'
import { Card } from '@/components/ui/card'
import { Anime } from '@/types/anime'

export const AnimeHeader = ({ anime }: { anime: Anime }) => {
  console.log(anime)
  return (
    <Card className="relative overflow-hidden rounded-lg">
      <div className="flex flex-col md:flex-row gap-6 p-6">
        <img src={anime.poster} alt={anime.name} className="w-64 h-96 object-cover rounded-lg" />
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">{anime.name}</h1>
          <p className="text-muted-foreground">{anime.jname}</p>
          <p className="line-clamp-5">{anime.description}</p>
        </div>
      </div>
    </Card>
  )
}
