'use client'

// import { useParams } from 'next/navigation'
import * as React from 'react'

import { Alert, AlertDescription } from '@/components/ui/alert'

export interface IAnimeEpisode {
  name: string
  url: string
}

export default function AnimePage() {
  // const params = useParams() as {
  //   episodeId: string
  //   animeId: string
  // }

  // const data: MediaData = {
  //   tracks: [
  //     {
  //       file: 'https://s.megastatics.com/subtitle/9170b9786e812a2949c8143dfe95a7e9/ara-3.vtt',
  //       label: 'Arabic',
  //       kind: 'captions',
  //     },
  //     {
  //       file: 'https://s.megastatics.com/subtitle/c94416bbb318bd2baa7ac6c3ab7117b9/c94416bbb318bd2baa7ac6c3ab7117b9.vtt',
  //       label: 'English',
  //       kind: 'captions',
  //       default: true,
  //     },
  //     {
  //       file: 'https://s.megastatics.com/subtitle/9170b9786e812a2949c8143dfe95a7e9/fre-4.vtt',
  //       label: 'French - Francais(France)',
  //       kind: 'captions',
  //     },
  //     {
  //       file: 'https://s.megastatics.com/subtitle/9170b9786e812a2949c8143dfe95a7e9/ger-5.vtt',
  //       label: 'German - Deutsch',
  //       kind: 'captions',
  //     },
  //     {
  //       file: 'https://s.megastatics.com/subtitle/9170b9786e812a2949c8143dfe95a7e9/ita-6.vtt',
  //       label: 'Italian - Italiano',
  //       kind: 'captions',
  //     },
  //     {
  //       file: 'https://s.megastatics.com/subtitle/9170b9786e812a2949c8143dfe95a7e9/por-9.vtt',
  //       label: 'Portuguese - Portugues(Brasil)',
  //       kind: 'captions',
  //     },
  //     {
  //       file: 'https://s.megastatics.com/subtitle/9170b9786e812a2949c8143dfe95a7e9/rus-10.vtt',
  //       label: 'Russian',
  //       kind: 'captions',
  //     },
  //     {
  //       file: 'https://s.megastatics.com/subtitle/9170b9786e812a2949c8143dfe95a7e9/spa-8.vtt',
  //       label: 'Spanish - Espanol',
  //       kind: 'captions',
  //     },
  //     {
  //       file: 'https://s.megastatics.com/subtitle/9170b9786e812a2949c8143dfe95a7e9/spa-7.vtt',
  //       label: 'Spanish - Espanol(Espana)',
  //       kind: 'captions',
  //     },
  //     {
  //       file: 'https://s.megastatics.com/thumbnails/35cc1993ec093d8447a37c498607c782/thumbnails.vtt',
  //       kind: 'thumbnails',
  //     },
  //   ],
  //   intro: { start: 55, end: 143 },
  //   outro: { start: 0, end: 0 },
  //   sources: [
  //     {
  //       url: 'https://w2r.biananset.net/_v7/97d61118206bb19859ccff8dd2317be358178cb002a5091e5d385ab79512acae03a3ffb61b6f980b3654d6686c6aef47a52e289f1e349cbd48f0ed79b2d7e760ce10831fcab5dd28a4fbf45427ada27e3c0278fa952eef7f2a885989b608f9fede998efa566c72080be8ea62888ea0b583748e83dc85050d5424ce3e7cc5054d/master.m3u8',
  //       type: 'hls',
  //     },
  //   ],
  //   anilistID: 0,
  //   malID: 40748,
  //   comments: [],
  // }

  // const [anime, setAnime] = useState<IAnime | null>(null)
  // const [isLoading, setIsLoading] = useState(true)
  // const [episode, setEpisode] = useState<IAnimeEpisode[] | null>(null)
  // const [comments, setComments] = useState<any>(null)
  // const [error, setError] = useState<string | null>(null)
  // const streamUrl =
  //   'https://w2r.biananset.net/_v7/97d61118206bb19859ccff8dd2317be358178cb002a5091e5d385ab79512acae03a3ffb61b6f980b3654d6686c6aef47a52e289f1e349cbd48f0ed79b2d7e760ce10831fcab5dd28a4fbf45427ada27e3c0278fa952eef7f2a885989b608f9fede998efa566c72080be8ea62888ea0b583748e83dc85050d5424ce3e7cc5054d/master.m3u8'
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true)
  //       setError(null)
  //       const [animeData, episodeData] = await Promise.all([
  //         api.get(`/anime/${params.animeId}`),
  //         api.get(`/anime/episode/${params.episodeId}`),
  //       ])
  //       setAnime(animeData.data)
  //       setEpisode(episodeData.data.sources)
  //       setComments(episodeData.data.comments)
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         console.error('Error fetching data:', error.message)
  //       } else {
  //         console.error('Something went wrong', error)
  //       }
  //       setError('Failed to load anime data. Please try again later.')
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   if (params.animeId && params.episodeId) {
  //     fetchData()
  //   }
  // }, [params.animeId, params.episodeId])

  // if (isLoading) {
  //   return (
  //     <div className="container mx-auto px-4 pb-8 space-y-4">
  //       <Skeleton className="w-full aspect-video" />
  //       <Skeleton className="h-24 w-full" />
  //       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
  //         {Array.from({ length: 8 }).map((_, i) => (
  //           <Skeleton key={i} className="h-32" />
  //         ))}
  //       </div>
  //     </div>
  //   )
  // }

  // if (error) {
  //   return (
  //     <div className="container mx-auto px-4 py-8">
  //       <Alert variant="destructive">
  //         <AlertDescription>{error}</AlertDescription>
  //       </Alert>
  //     </div>
  //   )
  // }

  // if (!anime || !episode) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Alert>
        <AlertDescription>
          It not me it that website from were i am scraping. under developement
        </AlertDescription>
      </Alert>
    </div>
  )
  // }

  return (
    <div className="min-h-screen">
      <div className="w-full pt-0 lg:pt-0">
        <div className="flex flex-col gap-6 lg:gap-8">
          <div className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden mb-6">
            {/* <ArtPlayer data={data} /> */}
          </div>
          {/* <AnimeBottomSection
            episode={episode}
            anime={anime}
            animeId={params.animeId}
            episodeId={params.episodeId}
            comments={comments}
            setComments={setComments}
            changeStream={(streamUrl: string) => {
              console.warn(streamUrl)
            }}
          /> */}
        </div>
      </div>
    </div>
  )
}

// interface MediaData {
//   sources: Array<{ url: string; type: string }>
//   tracks: Array<{ file: string; label: string; kind: string; default?: boolean }>
//   intro: { start: number; end: number }
//   outro: { start: number; end: number }
// }

// interface ArtPlayerProps {
//   data: MediaData
// }

// const ArtPlayer: React.FC<ArtPlayerProps> = ({ data }) => {
//   const artPlayerRef = React.useRef<HTMLDivElement>(null)
//   const hlsRef = React.useRef<Hls | null>(null)
//   const { sources, tracks, intro } = data

//   useEffect(() => {
//     if (!artPlayerRef.current) {
//       return
//     }

//     const art = new Artplayer({
//       container: artPlayerRef.current,
//       url: sources[0].url,
//       pip: true,
//       autoSize: true,
//       fullscreen: true,
//       playbackRate: true,
//       plugins: [
//         thumbnailPlugin({
//           vtt: tracks.find((t) => t.kind === 'thumbnails')?.file || '',
//         }) as any,
//         (player: Artplayer) => {
//           hlsRef.current = new Hls()
//           hlsRef.current.loadSource(sources[0].url)
//           hlsRef.current.attachMedia(player.video)

//           return {
//             name: 'hls-quality',
//             mounted: () => {
//               hlsRef.current?.on(Hls.Events.MANIFEST_PARSED, () => {
//                 const levels = hlsRef.current?.levels || []
//                 const qualityOptions = levels.map((level, index) => ({
//                   html: `${level.height}p`,
//                   level: index,
//                 }))
//                 qualityOptions.push({ html: 'Auto', level: -1 })

//                 player.controls.add({
//                   name: 'quality',
//                   position: 'right',
//                   html: 'Quality',
//                   selector: qualityOptions,
//                   onSelect: (item: any) => {
//                     if (hlsRef.current) {
//                       hlsRef.current.currentLevel = item.level
//                     }
//                   },
//                 })

//                 if (intro.end > 0) {
//                   player.controls.add({
//                     name: 'skip-intro',
//                     position: 'right',
//                     html: 'Skip Intro',
//                     tooltip: `Skip to ${intro.end}s`,
//                   })
//                 }
//               })
//             },
//             beforeDestroy: () => {
//               hlsRef.current?.destroy()
//             },
//           }
//         },
//       ],
//       controls: [
//         {
//           name: 'subtitle',
//           position: 'right',
//           html: 'Subtitles',
//           selector: tracks
//             .filter((t) => t.kind === 'captions')
//             .map((track) => ({
//               html: track.label,
//               url: track.file,
//               default: track.default,
//             })),
//           onSelect: (item: any) => {
//             art.subtitle.switch(item.url, {
//               name: item.html,
//               style: {
//                 color: '#FFF',
//                 fontSize: '20px',
//                 textShadow: '1px 1px 2px #000',
//               },
//             })
//           },
//         },
//       ],
//     })

//     return () => {
//       art.destroy()
//     }
//   }, [data, intro.end, sources, tracks])

//   return <div ref={artPlayerRef} className="size-full rounded-lg overflow-hidden" />
// }
