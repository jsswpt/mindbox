import { allSettled, createEvent, fork } from 'effector'
import { describe, expect, test } from 'vitest'

import { clearCompletedTasks } from './model'
import { $taskList, type Task } from 'root/entities/task'

const setTasks = createEvent<Array<Task> | null>()

$taskList.on(setTasks, (_, payload) => payload)

describe("clear-completed-tasks'", () => {
    test('If taskList contains completed tasks and uncompleted tasks, return the uncompleted tasks', async () => {
        const scope = fork()

        const tasks: Array<Task> = [
            {
                id: 1,
                isDone: true,
                title: 'Completed task',
            },
            {
                id: 2,
                isDone: true,
                title: 'Completed task 2',
            },
            {
                id: 3,
                isDone: false,
                title: 'Uncompleted task',
            },
        ]

        await allSettled(setTasks, {
            params: tasks,
            scope,
        })

        await allSettled(clearCompletedTasks, { scope })

        const finalTasks = scope.getState($taskList)

        expect(finalTasks).toStrictEqual([tasks[2]])
    })

    test('If taskList contains only completed tasks, return the null', async () => {
        const scope = fork()

        const tasks: Array<Task> = [
            {
                id: 1,
                isDone: true,
                title: 'Completed task',
            },
            {
                id: 2,
                isDone: true,
                title: 'Completed task 2',
            },
            {
                id: 3,
                isDone: true,
                title: 'Completed task',
            },
        ]

        await allSettled(setTasks, {
            params: tasks,
            scope,
        })

        await allSettled(clearCompletedTasks, { scope })

        const finalTasks = scope.getState($taskList)

        expect(finalTasks).toBe(null)
    })

    test('If taskList equals null, return the null', async () => {
        const scope = fork()

        await allSettled(setTasks, {
            params: null,
            scope,
        })

        await allSettled(clearCompletedTasks, { scope })

        const finalTasks = scope.getState($taskList)

        expect(finalTasks).toBe(null)
    })
})
