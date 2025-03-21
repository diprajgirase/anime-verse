import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { hianime } from '@/lib/animeClient'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const query = searchParams.get('q') || ''
    const response = await hianime.search(query)
    return NextResponse.json(response)
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(error)
  }
}
