'use client'
import React, { useState } from 'react'
import { Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { CommentsList } from './CommentsList'
import { api } from '@/lib/api'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { IAnimeEpisode } from '@/app/(site)/anime/[animeId]/[episodeId]/page'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { EpisodesList } from './EpisodesList'

export interface IEpisode {
  id?: string
  number?: number
  title?: string
  name?: string
  isFiller?: boolean
  url?: string
}

export interface IAnime {
  description?: string
  episodes?: IEpisode[]
  genres?: string[]
  id?: string
  image?: string
  otherName?: string
  releaseDate?: string
  status?: string
  subOrDub?: string
  title?: string
  totalEpisodes?: number
  type?: string
  url?: string
}

export interface IComment {
  content: string
  id: string
  createdAt: string
  user: {
    id: string
    name: string | null
    image: string | null
    email: string
  }
  email: string
  image: string | null
  name: string | null
}

export function AnimeBottomSection({
  anime,
  animeId,
  comments,
  setComments,
  episodeId,
  episode,
  changeStream,
}: {
  anime: IAnime
  episode: IAnimeEpisode[]
  animeId: string
  episodeId: string
  comments: IComment[]
  changeStream: (streamUrl: string) => void
  setComments: (comments: IComment[] | ((prevComments: IComment[]) => IComment[])) => void
}) {
  const [isFavorite, setIsFavorite] = useState(false)

  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const { data } = useSession()

  async function handleComment() {
    setLoading(true)
    try {
      if (newComment.length < 3) {
        toast.error('Comment must be at least 3 characters long')
        return
      }
      const { data: comment } = await api.post('/anime/comment', {
        content: newComment,
        userId: data?.user.id,
        animeId,
        episodeId,
      })
      setNewComment('')
      setComments((prevComments: IComment[]) => [...prevComments, comment])
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">{anime?.title}</h1>
        <p className="text-sm sm:text-base italic text-muted-foreground">
          {anime?.otherName || 'No other name'}
        </p>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6 space-y-2">
          <h1 className="font-semibold text-foreground">Anime Server</h1>
          <div className="border border-primary rounded-md p-4">
            {episode.map((item) => {
              return (
                <Button
                  variant={'link'}
                  key={item.url}
                  onClick={() => {
                    changeStream(item.url)
                  }}
                >
                  {item.name}
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="hidden justify-between items-center">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? 'text-primary' : ''}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Separator />

      {/* Anime Info */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-medium">{anime.type}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-medium">{anime.status}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Episodes</p>
              <p className="font-medium">{anime?.episodes?.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Genre</p>
              <p className="font-medium">{anime?.genres?.join(', ')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anime Description */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-2">
          <h2 className="font-semibold text-foreground">Description</h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {anime?.description}
          </p>
        </CardContent>
      </Card>

      <div className="">
        <ScrollArea className="">
          <div className="pr-4">
            <EpisodesList animeId={animeId} anime={anime} />
          </div>
        </ScrollArea>
      </div>

      {/* Comments Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-foreground">
            Comments ({comments?.length})
          </h3>
        </div>

        {/* Comment Input */}
        <div>
          {data?.user ? (
            <div className="flex space-x-4">
              <Avatar>
                <AvatarImage
                  src={data.user.image || undefined}
                  alt="Your Avatar"
                  className="object-cover"
                />
                <AvatarFallback>{data.user.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-grow space-y-4">
                <Input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full"
                />
                <Button disabled={loading} onClick={handleComment} className="w-full sm:w-auto">
                  {loading ? 'Posting...' : 'Comment'}
                </Button>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Please login to add a comment</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Comments List */}
        <CommentsList comments={comments} />
      </div>
    </div>
  )
}
