export interface Card {
  name: string
  corpName: string
  tag: string[]
  benefit: string[]
  promotion?: {
    title: string
    terms: string
  }
  payback?: string
}
