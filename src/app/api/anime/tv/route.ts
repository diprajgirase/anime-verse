import { NextResponse } from 'next/server'

import { animePaheClient } from '@/lib/animeClient'
import { getRedisClient } from '@/lib/redisClient'

export async function GET() {
  try {
    const cacheKey = 'anime-tv-data'
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
    console.error(error.message)
    return NextResponse.json(error)
  }
}
