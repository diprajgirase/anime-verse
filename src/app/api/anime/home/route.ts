import { NextResponse } from 'next/server'

import { hianime } from '@/lib/animeClient'
import { errorHandler } from '@/lib/error-handler'
import { getRedisClient } from '@/lib/redisClient'

const CACHE_KEY = 'homePageData'

export async function GET() {
  const redisClient = getRedisClient()

  try {
    const cachedData = await redisClient.get(CACHE_KEY)
    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData), {
        headers: {
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=300',
          'CDN-Cache-Control': 'public, max-age=3600',
        },
      })
    }
  } catch (cacheError) {
    console.error('Redis get error:', cacheError)
  }

  try {
    const homeData = await hianime.getHomePage()

    try {
      await redisClient.set(CACHE_KEY, JSON.stringify(homeData))
    } catch (cacheError) {
      console.error('Redis set error:', cacheError)
    }

    return NextResponse.json(homeData, {
      headers: {
        'Cache-Control': 'public, max-age=600, stale-while-revalidate=300',
        'CDN-Cache-Control': 'public, max-age=600',
      },
    })
  } catch (error: any) {
    console.error('Data fetch error:', error)
    const handleError = errorHandler(error)
    return NextResponse.json(handleError, { status: 500 })
  }
}
