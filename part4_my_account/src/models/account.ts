export interface Term {
  id: string
  title: string
  link: string
  mandatory: boolean
}
export interface BaseForm {
  id: string
  label: string
  required: boolean
  helpMessage?: string
}

export interface TextFieldForm extends BaseForm {
  type: 'TEXT_FIELD'
}

export interface SelectFieldForm extends BaseForm {
  type: 'SELECT_FIELD'
  options: Array<{ label: string; value: string }>
}
export type AccountForm = TextFieldForm | SelectFieldForm

export type AccountStatus = 'READY' | 'DONE'

export interface Account {
  accountName: string
  accountNumber: number
  balance: number
  email: string
  name: string
  phone: string
  status: AccountStatus
  userId: string
}
