import Gemini from 'gemini-ai'

const apikey = process.env.GEMINI_API as string

const geminiClient = new Gemini(apikey)
export const chat = geminiClient.createChat()
