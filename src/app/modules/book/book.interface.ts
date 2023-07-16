import { Date, Model, Types } from 'mongoose'

export type iBook = {
  name: string
  author: string
  publicationDate: Date
  genre: string
  summery: string
  user: Types.ObjectId
}

export type iBookModel = Model<iBook>

// export type iBookFilter = {
//   minPrice?: string
//   maxPrice?: string
//   location?: string
//   searchTerm?: string
// }

// export type iBookFilterFields = 'minPrice' | 'maxPrice' | 'location' | 'searchTerm'

// export type iBookSearchFields = 'location' | 'breed' | 'category'
