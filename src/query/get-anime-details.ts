import { useQuery } from 'react-query'

import { GET_ANIME_DETAILS } from '@/constants/query-keys'
import { api } from '@/lib/api'

export async function getAnimeDetailsData(animeId: string) {
  const res = await api.get(`/anime/${animeId}`)
  return res.data as any
}

export function useGetAnimeDetailsData(animeId: string) {
  return useQuery({
    queryFn: () => getAnimeDetailsData(animeId),
    queryKey: [GET_ANIME_DETAILS],
    refetchOnWindowFocus: false,
  })
}
