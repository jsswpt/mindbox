import { allSettled, createEvent, fork, sample } from 'effector'
import { describe, expect, test } from 'vitest'

import { getCachedKey } from '../lib'
import {
    $cachedTaskFilterList,
    $filteredTaskList,
    $taskFilterList,
    $taskList,
    FilterNamesEnum,
    filtersData,
    FilterTypesEnum,
} from './model'
import type { Task, TaskFilterList } from './model.type'

const mockTasks: Array<Task> = [
    {
        id: 1,
        isDone: false,
        title: 'I am first task',
    },
    {
        id: 2,
        isDone: false,
        title: 'I am second task',
    },
    {
        id: 3,
        isDone: true,
        title: 'I am third task',
    },
]

const filters: TaskFilterList = {
    [FilterTypesEnum.IS_DONE]: {
        ...filtersData.DONE,
        fn: filtersData.DONE.fn.bind({
            payload: filtersData.DONE.payload,
        }),
        name: FilterNamesEnum.DONE,
    },
    [FilterTypesEnum.TITLE]: {
        ...filtersData.TITLE,
        fn: filtersData.TITLE.fn.bind({ payload: { title: 'third' } }),
        name: FilterNamesEnum.TITLE,
        payload: {
            title: 'third',
        },
    },
}

const otherFilters: TaskFilterList = {
    [FilterTypesEnum.IS_DONE]: {
        ...filtersData.ACTIVE,
        fn: filtersData.ACTIVE.fn.bind({
            payload: filtersData.ACTIVE.payload,
        }),
        name: FilterNamesEnum.ACTIVE,
    },
    [FilterTypesEnum.TITLE]: {
        ...filtersData.TITLE,
        fn: filtersData.TITLE.fn.bind({ payload: { title: 'second' } }),
        name: FilterNamesEnum.TITLE,
        payload: {
            title: 'second',
        },
    },
}

const setDefaultTasks = createEvent()
const setFilters = createEvent<TaskFilterList>()
const setDefaultFilters = createEvent()
const setOtherFilters = createEvent()

sample({
    clock: setDefaultFilters,
    fn: () => filters,
    target: setFilters,
})

sample({
    clock: setOtherFilters,
    fn: () => otherFilters,
    target: setFilters,
})

$taskList.on(setDefaultTasks, () => mockTasks)
$taskFilterList.on(setFilters, (_, payload) => payload)

describe('Test task model', () => {
    test('Check if filters works correctly', async () => {
        const scope = fork()

        await allSettled(setDefaultTasks, { scope })

        await allSettled(setDefaultFilters, { scope })

        await allSettled(setOtherFilters, { scope })

        const taskFilters = scope.getState($taskFilterList)

        const filteredList = scope.getState($filteredTaskList)

        expect(taskFilters).toStrictEqual(otherFilters)
        expect(filteredList).toStrictEqual([mockTasks[1]])
    })
    test('Check if filters cashing works correctly', async () => {
        const scope = fork()

        await allSettled(setDefaultTasks, { scope })

        await allSettled(setDefaultFilters, { scope })

        await allSettled(setOtherFilters, { scope })

        await allSettled(setDefaultFilters, { scope })

        const cachedFilteredList = scope.getState($cachedTaskFilterList)

        expect(cachedFilteredList).toStrictEqual({
            [getCachedKey(mockTasks, otherFilters)]: [mockTasks[1]],
            [getCachedKey(mockTasks, filters)]: [mockTasks[2]],
        })
    })
})
