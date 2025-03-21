import { IAnime } from '@/types/anime'

export const getWishlistAnime = (): IAnime[] => {
  const stored = localStorage.getItem('wishlistAnime')
  return stored ? JSON.parse(stored) : []
}

export const updateWishlistAnime = (updatedList: IAnime[]) => {
  localStorage.setItem('wishlistAnime', JSON.stringify(updatedList))
}
