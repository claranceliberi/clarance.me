

export type CompanyColors = 'GREY' | 'BLUE' | 'GREEN'
export interface BlogInformation{
    title:string
    date:string
    duration?:number
    path:string
    description: string
}

export interface Experience {
    company: string
    startDate: string
    endDate?: string,
    color: CompanyColors
}

export interface Book {
    title: string
    author: string
    cover: string
    status: 'READING' | 'READ'
}

export interface CurrentBookResponse {
    book: Book | null
    source: 'environment' | 'static'
    lastUpdated?: string
}
