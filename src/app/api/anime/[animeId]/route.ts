import { NextResponse } from 'next/server'

import { hianime } from '@/lib/animeClient'
import { errorHandler } from '@/lib/error-handler'
import { getRedisClient } from '@/lib/redisClient'

export async function GET(request: Request, { params }: { params: Promise<{ animeId: string }> }) {
  try {
    const { animeId } = await params

    if (!animeId) {
      return NextResponse.json({ message: 'Anime ID is required' }, { status: 400 })
    }

    const redisClient = getRedisClient()

    const cachedAnime = await redisClient.get(animeId)
    if (cachedAnime) {
      return NextResponse.json(JSON.parse(cachedAnime), {
        headers: {
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=300',
          'CDN-Cache-Control': 'public, max-age=3600',
        },
      })
    }

    const animeData = await hianime.getInfo(animeId)
    const episodeData = await hianime.getEpisodes(animeId)
    await redisClient.set(animeId, JSON.stringify(animeData))

    return NextResponse.json(
      { ...animeData, episodes: episodeData },
      {
        headers: {
          'Cache-Control': 'public, max-age=600, stale-while-revalidate=300',
          'CDN-Cache-Control': 'public, max-age=600',
        },
      },
    )
  } catch (error: Error | unknown) {
    const handleError = errorHandler(error)
    return NextResponse.json(handleError, { status: 500 })
  }
}
