export interface Term {
  id: string
  title: string
  link: string
  mandatory: boolean
}

export interface AccountForm {
  id: string
  label: string
  required: boolean
  type: 'TEXT_FIELD' | 'CHECKBOX'
}
