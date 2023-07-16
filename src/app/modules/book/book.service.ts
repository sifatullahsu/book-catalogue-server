import ApiError from '../../../errors/api_error'
import { iBook } from './book.interface'
import Book from './book.model'

export const createBookDB = async (data: iBook): Promise<iBook> => {
  const result = await Book.create(data)

  return result
}

/* export const getBooksDB = async (
  filterObj: iBookModel,
  paginationObj: Partial<iPaginationResult>
): Promise<{
  meta: {
    page: number
    limit: number
    count: number
  }
  data: iBook[]
}> => {
  const { page, limit, skip, sortBy, sortOrder }: iPaginationResult = pagination(paginationObj)
  const { searchTerm, ...filtersData } = filterObj

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i'
        }
      }))
    })
  }

  if (Object.keys(filtersData).length) {
    const myArray = Object.entries(filtersData)

    andConditions.push({
      $and: myArray.map(item => {
        const [field, value] = item

        if (field === 'location') {
          return {
            [field]: value
          }
        } else if (field === 'maxPrice') {
          return {
            price: { $lte: parseInt(value) }
          }
        } else {
          return {
            price: { $gte: parseInt(value) }
          }
        }
      })
    })
  }

  const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Book.find(whereConditions).sort(sortConditions).skip(skip).limit(limit)
  const count = await Book.find(whereConditions).countDocuments()

  return {
    meta: {
      page,
      limit,
      count
    },
    data: result
  }
} */

export const getBooksDB = async (query: any): Promise<iBook[] | null> => {
  // const findQuery = { $and: [{ name: 'search' }, { genre: 'genre' }, { publicationDate: 'publicationDate' }] }

  const initialQuery = []

  if (query.search) {
    initialQuery.push({
      $or: [
        { name: { $regex: new RegExp(query.search, 'i') } },
        { author: { $regex: new RegExp(query.search, 'i') } }
      ]
    })
  }
  if (query.genre) {
    initialQuery.push({ genre: query.genre })
  }
  if (query.publicationDate) {
    initialQuery.push({ $expr: { $eq: [{ $year: '$publicationDate' }, query.publicationDate] } })
  }

  query = initialQuery.length > 0 ? { $and: initialQuery } : {}

  const result = await Book.find(query)
  if (!result) throw new ApiError(404, 'Not found.')

  return result
}

export const getBookDB = async (id: string): Promise<iBook | null> => {
  const result = await Book.findById(id)
  if (!result) throw new ApiError(404, 'Not found.')

  return result
}

export const updateBookDB = async (id: string, data: Partial<iBook>): Promise<iBook | null> => {
  const result = await Book.findByIdAndUpdate(id, data, { runValidators: true, new: true })

  return result
}

export const deleteBookDB = async (id: string): Promise<iBook | null> => {
  const result = await Book.findByIdAndDelete(id)

  return result
}
