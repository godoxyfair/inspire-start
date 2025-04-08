export type AuthRequestDto = {
  login: string
  password: string
}

export type HabitsDTO = {
  id: string
  title: string
  createdAt: Date
  logs: string[]
}

export type HabitsListResponseDTO = {
  data: Array<HabitsDTO>
  total: number
  page: number
  totalPages: number
}
