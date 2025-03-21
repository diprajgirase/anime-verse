import { useQuery } from 'react-query'

import { GET_HOME_PAGE_DATA } from '@/constants/query-keys'
import { api } from '@/lib/api'

export async function getHomePageData() {
  const res = await api.get('/anime/home')
  return res.data as any
}

export function useGetHomePageData() {
  return useQuery({
    queryFn: getHomePageData,
    queryKey: [GET_HOME_PAGE_DATA],
    refetchOnWindowFocus: false,
  })
}
