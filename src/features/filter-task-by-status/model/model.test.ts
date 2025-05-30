import { allSettled, createEvent, fork } from 'effector'
import { describe, expect, test } from 'vitest'

import { handleChange, NONE } from './model'
import {
    $currentTaskList,
    $taskList,
    FilterNamesEnum,
    type Task,
} from 'root/entities/task'

const setTasks = createEvent<Array<Task> | null>()

$taskList.on(setTasks, (_, payload) => payload)

describe('filter-task-by-status', () => {
    test("if the 'currentTaskList' contains matching items, return matching items", async () => {
        const scope = fork()

        const testTasks: Array<Task> = [
            {
                id: 1,
                isDone: false,
                title: 'Test task 1',
            },
            {
                id: 2,
                isDone: false,
                title: 'Test task 2',
            },
            {
                id: 3,
                isDone: true,
                title: 'Test task 3',
            },
        ]

        await allSettled(setTasks, { params: testTasks, scope })

        await allSettled(handleChange, { params: FilterNamesEnum.DONE, scope })

        const finalTasks = scope.getState($currentTaskList)

        expect(finalTasks).toStrictEqual([testTasks[2]])
    })

    test("if the filters are cleared after changing the filter to 'NONE', return the original array.", async () => {
        const scope = fork()

        const testTasks: Array<Task> = [
            {
                id: 1,
                isDone: false,
                title: 'Test task 1',
            },
            {
                id: 2,
                isDone: false,
                title: 'Test task 2',
            },
            {
                id: 3,
                isDone: true,
                title: 'Test task 3',
            },
        ]

        await allSettled(setTasks, { params: testTasks, scope })

        await allSettled(handleChange, { params: FilterNamesEnum.DONE, scope })

        await allSettled(handleChange, { params: NONE, scope })

        const finalTasks = scope.getState($currentTaskList)

        expect(finalTasks).toStrictEqual(testTasks)
    })
})
