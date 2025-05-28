import { createEvent, createStore, sample } from 'effector'

import { getCachedKey } from '../lib'
import type {
    AddFilters,
    FilterName,
    FiltersData,
    FilterType,
    Task,
    TaskFilterList,
} from './model.type'

export const FilterNamesEnum = {
    ACTIVE: 'ACTIVE',
    DONE: 'DONE',
    TITLE: 'TITLE',
} as const

export const FilterTypesEnum = {
    IS_DONE: 'IS_DONE',
    TITLE: 'TITLE',
} as const

export const filterNameToType: Record<FilterName, FilterType> = {
    [FilterNamesEnum.ACTIVE]: FilterTypesEnum.IS_DONE,
    [FilterNamesEnum.DONE]: FilterTypesEnum.IS_DONE,
    [FilterNamesEnum.TITLE]: FilterTypesEnum.TITLE,
}

export const filtersData: Readonly<FiltersData> = {
    [FilterNamesEnum.ACTIVE]: {
        fn({ isDone }) {
            return isDone === this.payload?.isDone
        },
        payload: { isDone: false },
        type: filterNameToType[FilterNamesEnum.ACTIVE],
    },
    [FilterNamesEnum.DONE]: {
        fn({ isDone }) {
            return isDone === this.payload?.isDone
        },
        payload: { isDone: true },
        type: filterNameToType[FilterNamesEnum.DONE],
    },
    [FilterNamesEnum.TITLE]: {
        fn({ title }) {
            return title
                .toLowerCase()
                .includes((this.payload?.title ?? '').toLowerCase())
        },
        type: filterNameToType[FilterNamesEnum.TITLE],
    },
}

const getFilteredList = createEvent<string>()

export const filterTasks = createEvent()

export const addFilters = createEvent<AddFilters>()

export const setFilteredTaskList = createEvent<Array<Task>>()

export const cacheFilteredTaskList = createEvent<Array<Task>>()

export const $taskList = createStore<Array<Task> | null>(null)

export const $filteredTaskList = createStore<Array<Task> | null>(null)

export const $currentTaskList = createStore<Array<Task> | null>(null)

export const $taskFilterList = createStore<TaskFilterList | null>(null)

export const $cachedTaskFilterList = createStore<Record<string, Array<Task>>>(
    {}
)

$taskFilterList.on(addFilters, (state, payload) => {
    const payloadToFilters = payload.reduce((acc, curr) => {
        const filterData = filtersData[curr.name]

        filterData.payload = curr.payload ? curr.payload : filterData.payload

        const newFilter = {
            [filterNameToType[curr.name]]: {
                ...filterData,
                fn: filterData.fn.bind(this),
            },
        }

        return {
            ...acc,
            ...newFilter,
        }
    }, state)

    return payloadToFilters
})

sample({
    fn: ({ taskFilterList, taskList }) =>
        getCachedKey(taskList, taskFilterList),
    source: { taskFilterList: $taskFilterList, taskList: $taskList },
    target: getFilteredList,
})

sample({
    clock: getFilteredList,
    filter: ({ cachedTaskFilterList }, key) => !(key in cachedTaskFilterList),
    source: {
        cachedTaskFilterList: $cachedTaskFilterList,
    },
    target: filterTasks,
})

sample({
    clock: filterTasks,
    filter: ({ taskFilters, tasks }) => {
        if (taskFilters !== null && tasks?.length) {
            return true
        }

        return false
    },
    fn: ({ taskFilters, tasks }) => {
        const filtersList = Object.entries(taskFilters!).map(
            (data) => data[1]?.fn
        )

        const result = tasks!.filter(
            (task) =>
                !filtersList.map((filter) => filter?.(task)).includes(false)
        )

        return result
    },
    source: { taskFilters: $taskFilterList, tasks: $taskList },
    target: setFilteredTaskList,
})

sample({
    clock: setFilteredTaskList,
    target: cacheFilteredTaskList,
})

sample({
    clock: setFilteredTaskList,
    target: $filteredTaskList,
})

sample({
    clock: getFilteredList,
    filter: ({ cachedTaskFilterList }, key) => key in cachedTaskFilterList,
    fn: ({ cachedTaskFilterList }, key) => cachedTaskFilterList[key],
    source: {
        cachedTaskFilterList: $cachedTaskFilterList,
    },
    target: setFilteredTaskList,
})

sample({
    clock: cacheFilteredTaskList,
    filter: ({ cachedTaskFilterList, taskFilterList, taskList }) =>
        !(getCachedKey(taskList, taskFilterList) in cachedTaskFilterList),
    fn: (
        { cachedTaskFilterList, taskFilterList, taskList },
        filteredTaskList
    ) => ({
        ...cachedTaskFilterList,
        [getCachedKey(taskList, taskFilterList)]: filteredTaskList ?? [],
    }),
    source: {
        cachedTaskFilterList: $cachedTaskFilterList,
        taskFilterList: $taskFilterList,
        taskList: $taskList,
    },
    target: $cachedTaskFilterList,
})

sample({
    fn: ({ filteredTaskList, taskFilterList, taskList }) =>
        taskFilterList !== null ? filteredTaskList : taskList,
    source: {
        filteredTaskList: $filteredTaskList,
        taskFilterList: $taskFilterList,
        taskList: $taskList,
    },
    target: $currentTaskList,
})
