import type { Book, CurrentBookResponse } from '~/types'
import { books } from '~/data/index'

export default defineEventHandler(async (event): Promise<CurrentBookResponse> => {
  try {
    // Check for environment variables first
    const envTitle = process.env.CURRENT_BOOK_TITLE
    const envAuthor = process.env.CURRENT_BOOK_AUTHOR
    const envCover = process.env.CURRENT_BOOK_COVER
    const envLastUpdated = process.env.CURRENT_BOOK_LAST_UPDATED

    // If all required environment variables are present, use them
    if (envTitle && envAuthor && envCover) {
      const environmentBook: Book = {
        title: envTitle,
        author: envAuthor,
        cover: envCover,
        status: 'READING'
      }

      return {
        book: environmentBook,
        source: 'environment',
        lastUpdated: envLastUpdated || new Date().toISOString()
      }
    }

    // Fall back to static data
    const staticCurrentBook = books.find(book => book.status === 'READING')
    
    return {
      book: staticCurrentBook || null,
      source: 'static',
      lastUpdated: undefined
    }
  } catch (error) {
    console.error('Error fetching current book:', error)
    
    // Emergency fallback to static data
    const staticCurrentBook = books.find(book => book.status === 'READING')
    
    return {
      book: staticCurrentBook || null,
      source: 'static',
      lastUpdated: undefined
    }
  }
})