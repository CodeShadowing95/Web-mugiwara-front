import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const Paginate = ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number,
    totalPages: number,
    onPageChange: (pageNumber: number) => void,
  }) => {
    const handlePageChange = (pageNumber: number) => {
        onPageChange(pageNumber)
      }
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }
  return (
    <Pagination>
        <PaginationPrevious>
          <PaginationLink
            isActive={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </PaginationLink>
        </PaginationPrevious>
        <PaginationContent>
          <PaginationEllipsis />
          {pages}
          <PaginationEllipsis />
        </PaginationContent>
        <PaginationNext>
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </PaginationLink>
        </PaginationNext>
    </Pagination>
  )
}

export default Paginate