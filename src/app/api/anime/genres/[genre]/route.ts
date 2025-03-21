import { animeGogoClient, animePaheClient } from '@/lib/animeClient'
import { getRedisClient } from '@/lib/redisClient'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ genre: string }> },
) {
  try {
    const genre = (await params)?.genre
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page') || '1'
    if (!genre) {
      return Response.json(
        {
          error: 'genre is required',
        },
        {
          status: 401,
        },
      )
    }
    const redisClient = getRedisClient()
    const redisKey = `genre-${genre}-${page}`
    const cacheGenre = await redisClient.get(redisKey)
    if (cacheGenre) {
      return Response.json(JSON.parse(cacheGenre), {
        status: 200,
      })
    }
    const response = await animeGogoClient.fetchGenreInfo(genre, parseInt(page))
    await redisClient.set(redisKey, JSON.stringify(response))
    return Response.json(response, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return Response.json(
      { error: error.message },
      {
        status: 500,
      },
    )
  }
}
