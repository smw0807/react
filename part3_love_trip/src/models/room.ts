export interface Room {
  price: number
  roomName: string
  avaliableCount: number
  basicInfo: {
    squareMeters: string
    maxOccupancy: number
    bed: string
    smoke?: string
  }
  refundable: boolean
  imageUrl: string
}
