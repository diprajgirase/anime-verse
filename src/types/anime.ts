// types/anime.ts
export interface EpisodeCount {
  sub: number
  dub: number | null
}

export interface AnimeData {
  anime: {
    info: {
      id: string
      anilistId: number
      malId: number
      name: string
      poster: string
      description: string
      stats: {
        rating: string
        quality: string
        episodes: EpisodeCount
        type: string
        duration: string
      }
      promotionalVideos: Array<{
        title: string
        source: string
        thumbnail: string
      }>
      charactersVoiceActors: Array<{
        character: {
          id: string
          poster: string
          name: string
          cast: string
        }
        voiceActor: {
          id: string
          poster: string
          name: string
          cast: string
        }
      }>
    }
    moreInfo: {
      japanese: string
      synonyms: string
      aired: string
      premiered: string
      duration: string
      status: string
      malscore: string
      genres: string[]
      studios: string
      producers: string[]
    }
  }
  seasons: any[] // Update with proper type if season data is available
  mostPopularAnimes: Array<{
    id: string
    name: string
    jname: string
    poster: string
    episodes: EpisodeCount
    type: string
  }>
  relatedAnimes: Array<{
    id: string
    name: string
    jname: string
    poster: string
    episodes: EpisodeCount
    type: string
  }>
  recommendedAnimes: Array<{
    id: string
    name: string
    jname: string
    poster: string
    duration: string
    type: string
    rating: string | null
    episodes: EpisodeCount
  }>
}

// Helper types for components
export type AnimeInfo = AnimeData['anime']['info']
export type MoreInfo = AnimeData['anime']['moreInfo']
export type RelatedAnime = AnimeData['relatedAnimes'][number]
export type RecommendedAnime = AnimeData['recommendedAnimes'][number]
export type VoiceActorCharacter = AnimeInfo['charactersVoiceActors'][number]
