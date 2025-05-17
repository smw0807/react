export interface Hotel {
  comment: string
  contents: string
  id: string
  images: string[]
  location: {
    directions: string
    pointGeolocation: {
      x: number
      y: number
    }
  }
  mainImageUrl: string
  name: string
  price: number
  starRating: number
  events?: {
    name: string
    promoEndTime?: string
    tagThemeStyle: {
      backgroundColor: string
      fontColor: string
    }
  }
  recommendHotel: string[]
  form: ReservationForm[]
}

interface BaseForm {
  id: string
  label: string
  required: string
  helpMessage?: string
}

interface TextForm extends BaseForm {
  type: 'TEXT_FIELD'
}

interface SelectForm extends BaseForm {
  type: 'SELECT'
  options: Array<{
    label: string
    value: string
  }>
}

export type ReservationForm = TextForm | SelectForm
