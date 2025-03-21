export function extractAnimeNames(rawString: string) {
  try {
    const jsonString = rawString
      .replace(/```json\n/, '') // Remove the opening marker
      .replace(/\n```/, '') // Remove the closing marker
      .trim() // Trim any extra spaces or newlines

    const parsedArray = JSON.parse(jsonString)

    // Ensure the parsed result is an array
    if (Array.isArray(parsedArray)) {
      return parsedArray
    } else {
      throw new Error('Parsed data is not an array.')
    }
  } catch (error: any) {
    console.error('Failed to parse JSON string:', error.message)
    return []
  }
}
