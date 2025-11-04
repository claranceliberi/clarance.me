import type { Book, Experience } from "~/types";


export const books: Book[] = [
  {
    title:"The Art of Negotiation",
    author: "Tim Castle",
    cover: "https://res.cloudinary.com/dawr8i20o/image/upload/c_lpad,f_webp,h_204,w_180,y_0/v1730193325/claranceliberi.me/books/Art_of_Negotiation_min_upfuqr.webp",
    status: "READING"
  },
  {
    title: 'Sarrounded By Idiots',
    author: 'T. Erikson',
    cover: 'https://res.cloudinary.com/dawr8i20o/image/upload/c_scale,f_webp,w_180/v1725100328/claranceliberi.me/books/sarrounded-by-idiots.webp',
    status: 'READ'
  }
]

export const experiences: Experience[] = [
  {
    company: 'Strettch Cloud',
    startDate: 'Jan 2024',
    color: 'PURPLE'
  },
  {
    company: 'Rwanda Social Security Board (RSSB)',
    startDate: 'Jan 2024',
    endDate: 'July 2025',
    color: 'BLUE'
  },
  {
    company: 'PivotAccess Ltd.',
    startDate: 'May 2023',
    endDate: 'Jan 2024',
    color: 'GREY'
  },
  {
    company: 'BP plc.',
    startDate: 'July 2022',
    endDate: 'March 2023',
    color: 'GREY'
  },
]
