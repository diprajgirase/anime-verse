'use client'
import { useEffect, useState } from 'react'
import AnimeCard from '@/components/ui/animeCard'
import { Card } from '@/components/ui/card'

interface Anime {
  id: string
  title: string
  image: string
  [key: string]: any
}

export default function WishList() {
  const [wishlistAnime, setWishlistAnime] = useState<Anime[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const storedAnime = localStorage.getItem('wishlistAnime')
      const parsedAnime = storedAnime ? JSON.parse(storedAnime) : []
      setWishlistAnime(parsedAnime)
    } catch (error) {
      console.error('Error loading wishlist:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-6">
        <h1 className="text-xl md:text-2xl font-bold text-primary mb-4">My Watchlist</h1>
        <div className="text-muted-foreground text-center py-8">Loading your watchlist...</div>
      </section>
    )
  }

  if (!wishlistAnime.length) {
    return (
      <section className="container mx-auto px-4 py-6">
        <h1 className="text-xl md:text-2xl font-bold text-primary mb-4">My Watchlist</h1>
        <Card className="bg-muted/50 p-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Your watchlist is empty</h3>
            <p className="text-muted-foreground">
              Start adding anime to your watchlist to keep track of what you want to watch!
            </p>
          </div>
        </Card>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-6">
      <h1 className="text-xl md:text-2xl font-bold text-primary mb-6">My Watchlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {wishlistAnime.map((anime: Anime, index: number) => (
          <AnimeCard anime={anime} key={anime.id || index} />
        ))}
      </div>
    </section>
  )
}
