import { animeGogoClient, animePaheClient } from '@/lib/animeClient'
import { getRedisClient } from '@/lib/redisClient'
import { NextResponse } from 'next/server'

const key = 'animeGenres'

export async function GET() {
  try {
    const redisClient = getRedisClient()
    const cachedData = await redisClient.get(key)
    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData))
    }
    const response = await animeGogoClient.fetchGenreList()
    await redisClient.set(key, JSON.stringify(response), {
      EX: 1000 * 60 * 60,
    })

    return NextResponse.json(response)
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json(error)
  }
}
