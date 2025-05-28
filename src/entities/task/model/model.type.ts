import type { FilterNamesEnum, FilterTypesEnum } from './model'
import type { EnumValue } from 'root/shared/lib/typescript'

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export type FilterName = EnumValue<typeof FilterNamesEnum>

export type FilterType = EnumValue<typeof FilterTypesEnum>

export type TaskFilterFn = {
    (task: Task): boolean
}

export type FilterData = {
    type: FilterType
    fn: TaskFilterFn
    payload?: Partial<Task>
}

export type FiltersData = Record<FilterName, FilterData>

export type TaskFilter = {
    name: FilterName
    fn: TaskFilterFn
    payload?: Partial<Task>
}

export type TaskFilterList = Partial<Record<FilterType, TaskFilter>>

export type AddFilters = Array<Omit<TaskFilter, 'fn'>>
