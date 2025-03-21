import { create } from 'zustand'
import { IAnime } from '@/types/anime'

interface IAnimeStore {
  anime: IAnime | null
  setAnime: (state: IAnime | null) => void
  selectedEpisode: string
  setSelectedEpisode: (state: string) => void
}

export const useAnimeStore = create<IAnimeStore>((set) => ({
  anime: {} as IAnime,
  setAnime: (state: IAnime | null) => set({ anime: state }),
  selectedEpisode: '',
  setSelectedEpisode: (state: string) => set({ selectedEpisode: state }),
}))
