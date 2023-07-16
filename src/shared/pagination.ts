import { SortOrder } from 'mongoose'

export type iPagination = {
  page: number
  limit: number
  sortBy: string
  sortOrder: SortOrder
}

export type iPaginationResult = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
}

export type iPaginationFields = 'page' | 'limit' | 'sortBy' | 'sortOrder'

export const paginationFields: iPaginationFields[] = ['page', 'limit', 'sortBy', 'sortOrder']

const pagination = (options: Partial<iPagination>): iPaginationResult => {
  const page = Number(options.page || 1)
  const limit = Number(options.limit || 10)
  const skip = (page - 1) * limit

  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'desc'

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  }
}

export default pagination
