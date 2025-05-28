import { allSettled, createEvent, fork, sample } from 'effector'
import { describe, expect, test } from 'vitest'

import { getCachedKey } from '../lib'
import {
    $cachedTaskFilterList,
    $filteredTaskList,
    $taskFilterList,
    $taskList,
    addFilters,
    FilterNamesEnum,
    filtersData,
    FilterTypesEnum,
} from './model'
import type { AddFilters, Task, TaskFilterList } from './model.type'

const mockTasks: Array<Task> = [
    {
        id: 1,
        isDone: false,
        title: 'I am first task (test word)',
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
        ...filtersData[FilterNamesEnum.DONE],
        fn: filtersData[FilterNamesEnum.DONE].fn.bind({
            payload: filtersData[FilterNamesEnum.DONE].payload,
        }),
        name: FilterNamesEnum.DONE,
    },
    [FilterTypesEnum.TITLE]: {
        ...filtersData[FilterNamesEnum.TITLE],
        fn: filtersData[FilterNamesEnum.TITLE].fn.bind({
            payload: { title: 'third' },
        }),
        name: FilterNamesEnum.TITLE,
        payload: {
            title: 'third',
        },
    },
}

const otherFilters: TaskFilterList = {
    [FilterTypesEnum.IS_DONE]: {
        ...filtersData[FilterNamesEnum.ACTIVE],
        fn: filtersData[FilterNamesEnum.ACTIVE].fn.bind({
            payload: filtersData[FilterNamesEnum.ACTIVE].payload,
        }),
        name: FilterNamesEnum.ACTIVE,
    },
    [FilterTypesEnum.TITLE]: {
        ...filtersData[FilterNamesEnum.TITLE],
        fn: filtersData[FilterNamesEnum.TITLE].fn.bind({
            payload: { title: 'second' },
        }),
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
    test('Check if filters adding works correctly', async () => {
        const scope = fork()

        const addDefaultFilters = createEvent()

        sample({
            clock: addDefaultFilters,
            fn: (): AddFilters => [
                { name: FilterNamesEnum.ACTIVE },
                {
                    name: FilterNamesEnum.TITLE,
                    payload: { title: '(test word)' },
                },
            ],
            target: addFilters,
        })

        await allSettled(setDefaultTasks, { scope })

        await allSettled(addDefaultFilters, { scope })

        const filteredList = scope.getState($filteredTaskList)

        expect(filteredList).toStrictEqual([mockTasks[0]])
    })
})
