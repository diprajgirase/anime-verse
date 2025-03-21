import { GET_GENRES_DATA } from '@/constants/query-keys'
import { api } from '@/lib/api'
import { useQuery } from 'react-query'

interface IAnime {
  id: string
  title: string
  url: string
  image: string
  duration: string
  japaneseTitle: string
  type: string
  nsfw: boolean
  sub: number
  dub: number
  episodes: number
}

interface IResponse {
  currentPage: number
  hasNextPage: boolean
  totalPages: number
  results: IAnime[]
}

export const getGenreData = async (value: string, page: string) => {
  const res = await api.get(`/anime/genres/${value || 'action'}?page=${page}`)
  return res.data as IResponse
}

export const useGetGenreData = (value: string, page: string) => {
  return useQuery({
    queryFn: () => getGenreData(value, page),
    queryKey: [GET_GENRES_DATA],
    refetchOnWindowFocus: false,
  })
}
