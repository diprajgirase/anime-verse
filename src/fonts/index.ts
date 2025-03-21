import { Protest_Revolution, Poppins } from 'next/font/google'

export const protestRevolution = Protest_Revolution({
  preload: true,
  subsets: ['latin'],
  weight: '400',
})

export const poppins = Poppins({
  preload: true,
  weight: '400',
  subsets: ['latin'],
})
