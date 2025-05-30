import { allSettled, createEvent, fork } from 'effector'
import { describe, expect, test } from 'vitest'

import { handleSubmit } from './model'
import { $currentTaskList, $taskList, type Task } from 'root/entities/task'

const setTasks = createEvent<Array<Task> | null>()

$taskList.on(setTasks, (_, payload) => payload)

describe('search-task', () => {
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

        await allSettled(handleSubmit, { params: 'Test task 1', scope })

        const finalTasks = scope.getState($currentTaskList)

        expect(finalTasks).toStrictEqual([testTasks[0]])
    })

    test("if the filters are cleared after changing the filter to '', return the original array.", async () => {
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

        await allSettled(handleSubmit, { params: 'Test task 1', scope })

        await allSettled(handleSubmit, { params: '', scope })

        const finalTasks = scope.getState($currentTaskList)

        expect(finalTasks).toStrictEqual(testTasks)
    })
})
