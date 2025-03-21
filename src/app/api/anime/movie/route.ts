import { animePaheClient } from '@/lib/animeClient'
import { getRedisClient } from '@/lib/redisClient'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const cacheKey = 'anime-movie-data'
    const redisClient = getRedisClient()
    const cachedData = await redisClient.get(cacheKey)
    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData))
    }
    const response = await animePaheClient.fetchTV()
    await redisClient.set(cacheKey, JSON.stringify(response), {
      EX: 60 * 60 * 24,
    })

    return NextResponse.json(response)
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json(error)
  }
}
