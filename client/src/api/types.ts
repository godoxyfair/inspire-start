export type AuthRequestDto = {
  login: string
  password: string
}

export enum HabitStatus {
  TODO,
  IN_PROGRESS,
  DONE,
  CANCELLED,
  ON_HOLD,
}

export type HabitsDTO = {
  id: string
  title: string
  createdAt: Date
  status: HabitStatus
  logs: string[]
}

export type HabitsCreateRequestDTO = {
  title: string
  status: HabitStatus
}

export type HabitsListResponseDTO = {
  data: Array<HabitsDTO>
  total: number
  page: number
  totalPages: number
}
