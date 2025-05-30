import { allSettled, createEvent, fork } from 'effector'
import { describe, expect, test } from 'vitest'

import {
    $currentTaskList,
    $filteredTaskList,
    $taskFilterList,
    $taskList,
    addFilters,
    FilterNamesEnum,
    filtersData,
    FilterTypesEnum,
    removeFilter,
} from './model'
import type { Task, TaskFilterList } from './model.type'

const testTasks: Array<Task> = [
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

const defaultFilters: TaskFilterList = {
    [FilterTypesEnum.IS_DONE]: {
        fn: filtersData[FilterNamesEnum.DONE].fn.bind({
            payload: filtersData[FilterNamesEnum.DONE].payload,
        }),
        name: FilterNamesEnum.DONE,
    },
    [FilterTypesEnum.TITLE]: {
        fn: filtersData[FilterNamesEnum.TITLE].fn.bind({
            payload: { title: 'third' },
        }),
        name: FilterNamesEnum.TITLE,
        payload: {
            title: 'third',
        },
    },
}

const setTasks = createEvent<Array<Task>>()

const setFilters = createEvent<TaskFilterList>()

$taskList.on(setTasks, (_, payload) => payload)
$taskFilterList.on(setFilters, (_, payload) => payload)

describe('Test task model', () => {
    test("if the 'filteredTaskList' array is equal to 'currentTaskList' and the tasks exist, return true", async () => {
        const scope = fork()

        await allSettled(setTasks, { params: testTasks, scope })

        await allSettled(setFilters, { params: defaultFilters, scope })

        const filteredTaskList = scope.getState($filteredTaskList)
        const currentTaskList = scope.getState($currentTaskList)

        expect(filteredTaskList).toStrictEqual(currentTaskList)
    })

    test("if the 'filteredTaskList' array is equal to 'currentTaskList' and the tasks are null, return true", async () => {
        const scope = fork()

        await allSettled(setTasks, { params: null, scope })

        await allSettled(setFilters, { params: defaultFilters, scope })

        const filteredTaskList = scope.getState($filteredTaskList)
        const currentTaskList = scope.getState($currentTaskList)

        expect(filteredTaskList).toStrictEqual(currentTaskList)
    })

    test("if, after deleting one of the several filters in the 'taskFilterList', the corresponding one disappears, but the rest remain, return true", async () => {
        const scope = fork()

        await allSettled(setFilters, { params: defaultFilters, scope })
        await allSettled(removeFilter, {
            params: FilterTypesEnum.IS_DONE,
            scope,
        })

        const finalTaskFilterList = scope.getState($taskFilterList)

        // eslint-disable-next-line
        const { [FilterTypesEnum.IS_DONE]: deleted, ...filters } =
            defaultFilters

        expect(finalTaskFilterList).toStrictEqual(filters)
    })

    test("if, after adding the filter, the 'taskFilterList' contains the corresponding one, return true", async () => {
        const scope = fork()

        await allSettled(addFilters, {
            scope,
            params: [{ name: FilterNamesEnum.DONE }],
        })

        const finalTaskFilterList = scope.getState($taskFilterList)

        expect(Object.keys(finalTaskFilterList!)).toStrictEqual([
            FilterTypesEnum.IS_DONE,
        ])
    })

    test("if, after deleting the filter, the 'taskFilterList' does not contain a matching one, return true", async () => {
        const scope = fork()

        await allSettled(setFilters, {
            scope,
            params: defaultFilters,
        })

        await allSettled(removeFilter, {
            scope,
            params: FilterTypesEnum.IS_DONE,
        })

        const finalTaskFilterList = scope.getState($taskFilterList)

        expect(Object.keys(finalTaskFilterList!)).toStrictEqual([
            FilterTypesEnum.TITLE,
        ])
    })
})
