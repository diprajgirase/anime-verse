import { chat } from '@/lib/geminiClient'
import { prisma } from '@/lib/prismaClient'
import { NextRequest, NextResponse } from 'next/server'
import { extractAnimeNames } from '@/lib/extractAnimeNames'
import { animeGogoClient } from '@/lib/animeClient'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    if (!userId) {
      return NextResponse.json({
        error: 'User ID is required',
      })
    }
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        likedAnimes: true,
        Like: true,
      },
    })
    if (!user) {
      return NextResponse.json({
        error: 'User not found',
      })
    }
    const animeIds = user.Like.map((like) => like.animeId)
    const prompt = `"prompt": "Given an array of anime ids, generate a list of anime titles only based on the input names. The generated titles should reflect the themes and styles of the original series while being unique. Do not include episode names, subtitles, or any game-related names—ensure the output contains purely anime series names. The output should be formatted as a JSON array. Below is the array of anime names to consider for generating related titles: ${JSON.stringify(
      animeIds,
    )}. Please provide the generated list of anime names in the format: ["Anime title 1", "Anime title 2","Anime title 3","Anime title 4", "Anime title 5", "Anime title 6", ...]."`
    const response = await chat.ask(prompt)

    const suggestions = extractAnimeNames(response)
    const animes = await Promise.all([
      ...suggestions.map((suggestion) =>
        animeGogoClient.search(suggestion.split(' ')[0] + ' ' + suggestion.split(' ')[1]),
      ),
    ])
    const filteredAnimes = animes.map((anime) => anime.results[0]).filter(Boolean)
    return NextResponse.json({
      message: response,
      filteredAnimes,
    })
  } catch (error: any) {
    console.error(error?.message)
    return NextResponse.json(
      { message: 'An error occurred' },
      {
        status: 500,
      },
    )
  }
}
