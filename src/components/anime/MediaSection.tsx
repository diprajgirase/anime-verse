// components/anime/MediaSection.tsx
import { Card } from '@/components/ui/card'
import { Anime } from '@/types/anime'

export const MediaSection = ({ anime }: { anime: Anime }) => {
  console.log('anime', anime)
  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Promotional Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {anime?.promotionalVideos?.map((video, index) => (
          <div key={index} className="aspect-video">
            <iframe src={video.source} className="w-full h-full rounded-lg" allowFullScreen />
          </div>
        ))}
      </div>
    </Card>
  )
}
