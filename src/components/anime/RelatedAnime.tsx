import { Card } from '@/components/ui/card'
import { AnimeData } from '@/types/anime'
import Link from 'next/link'

export const RelatedAnime = ({ animes }: { animes: AnimeData['relatedAnimes'] }) => (
  <Card className="p-6 space-y-4">
    <h2 className="text-2xl font-bold">Related Anime</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {animes?.map((anime, index) => (
        <Link key={index} href={`/anime/${anime.id}`}>
          <Card className="hover:bg-accent transition-colors">
            <img
              src={anime.poster}
              alt={anime.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-2 space-y-1">
              <p className="font-medium truncate">{anime.name}</p>
              <p className="text-sm text-muted-foreground">{anime.episodes.sub} Episodes</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  </Card>
)
