import { prisma } from '@/lib/prismaClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ animeId: string }> },
) {
  const animeId = (await params).animeId
  if (!animeId) {
    return NextResponse.json({
      message: 'animeid is required',
    })
  }
  try {
    const likesCount = await prisma.like.findMany({
      where: {
        animeId,
      },
    })

    const userIds = likesCount.map((like) => like.userId)
    return NextResponse.json({
      likesCount,
      userIds,
    })
  } catch (error) {}
}
