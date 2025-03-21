'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Info, Clock, Tv } from 'lucide-react'
import { useAnimeStore } from '@/store/anime-store'
import { Skeleton } from './skeleton'
import Link from 'next/link'

export default function AnimeDetailsModal({
  handleCloseModal,
  open,
}: {
  handleCloseModal: () => void
  open: boolean
}) {
  const { anime } = useAnimeStore()

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-purple-800 text-2xl">
            {anime?.title}
            {anime?.japaneseTitle && (
              <DialogDescription className="text-base text-gray-600 mt-1">
                {anime?.japaneseTitle}
              </DialogDescription>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {anime?.image ? (
            <img
              src={anime?.image}
              alt={anime?.title}
              className="w-full col-span-1 md:w-full  rounded-lg object-cover"
            />
          ) : (
            <Skeleton className="w-full min-h-3/5" />
          )}

          <div className="col-span-2">
            {anime?.description ? (
              <p className="text-lg mb-4 text-gray-700 line-clamp-6">{anime?.description}</p>
            ) : (
              <div className="flex flex-col gap-2 mb-5">
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-1/2 h-6" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold flex items-center mb-2">
                  <Info className="mr-2 w-5 h-5 text-purple-600" />
                  Details
                </h3>
                <div className="space-y-1">
                  {anime?.type && <Badge variant="secondary">Type: {anime?.type}</Badge>}
                  {anime?.totalEpisodes && (
                    <Badge variant="secondary">Total Episodes: {anime?.totalEpisodes}</Badge>
                  )}
                  {anime?.subOrDub && <Badge variant="secondary">Sub/Dub: {anime?.subOrDub}</Badge>}
                </div>
              </div>

              <div>
                <h3 className="font-semibold flex items-center mb-2">
                  <Clock className="mr-2 w-5 h-5 text-purple-600" />
                  Availability
                </h3>
                <div className="space-y-1">
                  <Badge variant="secondary">
                    Subtitles: {anime?.hasSub ? 'Available' : 'Not Available'}
                  </Badge>
                  {anime?.sub && <Badge variant="secondary">Sub Episodes: {anime?.sub}</Badge>}
                  {anime?.dub && <Badge variant="secondary">Dub Episodes: {anime?.dub}</Badge>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex space-x-4">
          <Link href={`/anime/a/${anime?.id}`}>
            <Button className="bg-pink-600 hover:bg-pink-700 flex items-center">
              <Tv className="" /> Watch Episodes
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
