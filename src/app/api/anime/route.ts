import { NextResponse } from 'next/server'

import { hianime } from '@/lib/animeClient'

export async function GET() {
  try {
    const anime = await hianime.search('jujutsu kaisen')
    console.warn(anime)
    const series = await hianime.getInfo('one-piece-100')
    console.warn(series)
    const a = await hianime.getEpisodes('jujutsu-kaisen-tv-534')
    return NextResponse.json({ anime, series, a })
  } catch (error: any) {
    return NextResponse.json(error)
  }
}
