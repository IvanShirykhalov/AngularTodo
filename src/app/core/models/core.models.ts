export interface CommonResponseType<T = {}> {
  data: T
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}
