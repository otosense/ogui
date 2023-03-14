export interface Session {
  ID: string
  device_id: string
  bt: number
  tt: number
  sr: number
  bit_depth: number
  channels: Array<{
    name: string
    description: string
  }>
  annotations: Array<{
    name: string
    bt: number
    tt: number
  }>
}

export type Operator = 'and' | 'or'

export type Optional<T> = T | null | undefined

export interface SessionFilterOptions {
  device_ids: Optional<string[]>
  from_bt: Optional<number>
  to_bt: Optional<number>
  from_tt: Optional<number>
  to_tt: Optional<number>
  annotations?: Optional<{
    names: string[]
    operator: Operator
  }>
  channels: Optional<{
    names: string[]
    operator: Operator
  }>
  sr: Optional<number>
}

export interface SessionSortOptions {
  field: 'device_id' | 'bt' | 'tt' | 'sr'
  mode: 'asc' | 'desc'
}

export interface PaginationOptions {
  from_idx: number
  to_idx: number
}
