import { prisma } from '@/lib/prismaClient'
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'

export async function GET(req: Request) {
  try {
    const likes = await prisma.comment.findMany({})
    return NextResponse.json(likes, {
      status: 200,
    })
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 },
    )
  }
}

export async function POST(req: Request | NextRequest) {
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
    const comment = await prisma.comment.create({
      data: {
        episode: body.episodeId,
        userId: body.userId,
        animeId: body.animeId,
        content: body.content,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
      },
    })
    return NextResponse.json(comment, { status: 200 })
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 },
    )
  }
}
