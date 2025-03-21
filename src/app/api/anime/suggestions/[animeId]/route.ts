import { NextResponse } from 'next/server'

import { chat } from '@/lib/geminiClient'

export async function GET(req: Request, { params }: { params: Promise<{ animeId: string }> }) {
  try {
    const { animeId } = await params
    if (!animeId) {
      return NextResponse.json({
        error: 'Anime ID is required',
      })
    }

    const prompt = `Prompt: 
"Create a concise yet engaging description for the anime titled '${animeId}'. The description should include the following elements:

1. **Plot Overview**: Provide a brief summary of the main storyline, highlighting key events and themes without revealing major spoilers.
   
2. **Main Characters**: List the primary characters, including their names and a one-sentence description of each character's role or significance in the story.
   
3. **Genres**: Specify the genres that best categorize the anime (e.g., action, romance, fantasy, etc.).
   
4. **Release Year**: Indicate the year the anime was released.
   
5. **Noteworthy Awards/Popularity Statistics**: Mention any significant awards the anime has won or notable popularity statistics, such as ratings or viewership numbers.

Ensure the response is informative and engaging, making it suitable for display on a streaming app while maintaining a concise format."`
    const response = await chat.ask(prompt)

    return NextResponse.json(
      {
        response,
      },
      {
        status: 200,
      },
    )
  } catch (error: any) {
    console.error(error?.message)
    return NextResponse.json(
      { error: 'Internal Server Error', message: error?.message },
      { status: 500 },
    )
  }
}
