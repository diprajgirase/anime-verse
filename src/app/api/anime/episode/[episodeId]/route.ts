import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { hianime } from '@/lib/animeClient'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ episodeId: string }> },
) {
  const { episodeId } = await params
  const epId = req.nextUrl.searchParams.get('ep')
  try {
    const sources = await hianime.getEpisodeSources(`${episodeId}?ep=${epId}`)

    // const comments = await prisma.comment.findMany({
    //   where: {
    //     episode: episodeId,
    //   },
    //   select: {
    //     id: true,
    //     content: true,
    //     createdAt: true,
    //     user: {
    //       select: {
    //         id: true,
    //         name: true,
    //         image: true,
    //         email: true,
    //       },
    //     },
    //   },
    // })

    return NextResponse.json(
      { ...sources, comments: [] },
      {
        status: 200,
      },
    )
  } catch (error: any) {
    console.error(error.message)
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 },
    )
  }
}
