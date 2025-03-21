import { Skeleton } from './skeleton'

export default function AnimeCardLoading() {
  return (
    <div className="">
      <div className="relative overflow-hidden ">
        <div className=" aspect-[2/3] rounded-lg overflow-hidden shadow">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
      </div>
      <div className="mt-3  grid grid-cols-4">
        <div className="pr-2 col-span-3">
          <h4 className="text-base font-semibold text-gray-800 line-clamp-1 group-hover:text-pink-600 transition-colors ">
            <Skeleton className="h-6 w-full rounded-lg" />
          </h4>
        </div>
        <Skeleton className="h-6 w-full rounded-lg" />
      </div>
    </div>
  )
}
