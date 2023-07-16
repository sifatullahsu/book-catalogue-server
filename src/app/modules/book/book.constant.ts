import { iCowCategory, iCowFilterFields, iCowLabel, iCowLocation, iCowSearchFields } from './book.interface'

export const cowLocation: iCowLocation[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh'
]

export const cowLabel: iCowLabel[] = ['for sale', 'sold out']

export const cowCategory: iCowCategory[] = ['Dairy', 'Beef', 'Dual Purpose']

export const cowFilterFields: iCowFilterFields[] = ['minPrice', 'maxPrice', 'location', 'searchTerm']

export const cowSearchFields: iCowSearchFields[] = ['location', 'breed', 'category']
