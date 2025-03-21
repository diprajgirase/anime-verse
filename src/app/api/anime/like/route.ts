import { prisma } from '@/lib/prismaClient'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const user = await prisma.user.findUnique({
      where: {
        id: body.userId,
      },
    })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        userId: body.userId,
        animeId: body.animeId,
      },
    })
    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      })
      return NextResponse.json({ message: 'Unliked' })
    }

    await prisma.like.create({
      data: {
        userId: body.userId,
        animeId: body.animeId,
      },
    })

    return NextResponse.json({ message: 'Liked' }, { status: 200 })
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 },
    )
  }
}
