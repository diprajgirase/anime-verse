import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface IAnimePagination {
  hasNextPage: boolean
  currentPage: number
  refetch: () => void
}

function AnimePagination({ hasNextPage, currentPage = 1, refetch }: IAnimePagination) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const genre = searchParams.get('q') || 'action'

  const handlePageChange = (page: number) => {
    if (page < 1) return

    const newUrl = `${pathname}?q=${genre}&page=${page}`
    router.push(newUrl, { scroll: true })
    setTimeout(refetch, 150)
  }

  const getVisiblePages = () => {
    const pages = [currentPage]

    if (hasNextPage) {
      pages.push(currentPage + 1)
      if (currentPage + 2 <= currentPage + 3) {
        pages.push(currentPage + 2)
      }
    }

    return pages
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {getVisiblePages().map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              onClick={() => handlePageChange(pageNum)}
              isActive={pageNum === currentPage}
              className="cursor-pointer"
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {hasNextPage && (
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default AnimePagination
