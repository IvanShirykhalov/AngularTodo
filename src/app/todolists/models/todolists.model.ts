export interface Todo {
  id: string
  addedDate: string
  order: number
  title: string
}

export interface DomainTodo extends Todo {
  filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed'
