import { IAnime, ISuggestionAnime } from './anime'

export interface IAnimeResponse {
  currentPage: number
  hasNextPage: boolean
  results: Array<IAnime>
}

export interface ISugggestionResponse {
  data: {
    suggestions: Array<ISuggestionAnime>
  }
}
