import { prisma } from '@/lib/prismaClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ animeId: string }> }) {
  try {
    const animeId = (await params).animeId
    const searchParams = req.nextUrl.searchParams
    const episodeId = searchParams.get('ep') || ''

    const query: { animeId: string; episode?: string } = {
      animeId,
    }

    if (episodeId) {
      query.episode = episodeId
    }

    const comments = await prisma.comment.findMany({
      where: query,
      include: {
        user: true,
      },
    })
    return NextResponse.json(comments, { status: 200 })
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 },
    )
  }
}
