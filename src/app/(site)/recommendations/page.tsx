'use client'
import AnimeCard from '@/components/ui/animeCard'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

interface IAnime {
  id: string
  title: string
  image: string
  released?: string
}

export default function RecommendationsPage() {
  const { data } = useSession()
  const [suggested, setSuggested] = useState<IAnime[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState('')
  async function fetchRecommendations() {
    setLoading(true)
    try {
      const response = await api.get(`/anime/recommendations?userId=${data?.user?.id}`)
      if (response?.data?.filteredAnimes?.length > 0) {
        setSuggested(response.data.filteredAnimes)
      } else {
        setError('Something went wrong')
      }
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container mx-auto px-4 pb-6 md:pb-8">
      <h1 className="text-xl md:text-2xl font-bold text-primary">Recommendations</h1>

      {!data?.user && (
        <div className="w-full flex items-center justify-center h-40 border-2 border-primary/25 rounded-lg bg-primary/5 mt-5">
          <p className="text-sm text-muted-foreground">
            To use this feature you have to login first.
          </p>
        </div>
      )}

      {data?.user && (
        <div className="mt-5">
          {suggested?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {suggested.map((item, index: number) => (
                <AnimeCard anime={item} key={index} />
              ))}
            </div>
          ) : (
            <div className="h-48 w-full flex items-center justify-center border rounded-lg bg-muted/50">
              <Button
                className="bg-primary hover:bg-primary/90"
                disabled={loading}
                onClick={fetchRecommendations}
              >
                {loading ? 'Generating...' : 'Generate'}
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
