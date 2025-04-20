export interface Card {
  name: string
  corpName: string
  tag: string[]
  benefit: string[]
  promotion?: {
    title: string
    term: string
  }
  payback?: string
}

export interface AdBanner {
  title: string
  description: string
  link: string
}
