// components/anime/AnimeStats.tsx
import { Card } from '@/components/ui/card'
import { Anime } from '@/types/anime'

export const AnimeStats = ({ anime }: { anime: Anime }) => (
  <Card className="p-6 space-y-4">
    <h2 className="text-2xl font-bold">Details</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <StatItem label="Rating" value={anime?.stats?.rating} />
      <StatItem label="Quality" value={anime?.stats?.quality} />
      <StatItem label="Type" value={anime?.stats?.type} />
      <StatItem label="Duration" value={anime?.stats?.duration} />
      <StatItem label="Episodes (Sub)" value={anime?.stats?.episodes?.sub?.toString()} />
      <StatItem label="Episodes (Dub)" value={anime?.stats?.episodes?.dub?.toString()} />
    </div>
  </Card>
)

const StatItem = ({ label, value }: { label: string; value?: string }) => (
  <div className="space-y-1">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="font-medium">{value || '-'}</p>
  </div>
)
