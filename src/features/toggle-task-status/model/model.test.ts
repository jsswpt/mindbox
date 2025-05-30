import { allSettled, createEvent, fork } from 'effector'
import { describe, expect, test } from 'vitest'

import { handleToggle } from './model'
import { $taskList, type Task } from 'root/entities/task'

const setTasks = createEvent<Array<Task> | null>()

$taskList.on(setTasks, (_, payload) => payload)

describe('toggle-task-status', () => {
    test('if the task status has changed, return true', async () => {
        const scope = fork()

        const testTasks: Array<Task> = [
            {
                id: 1,
                isDone: false,
                title: 'Test task 1',
            },
        ]

        await allSettled(setTasks, { params: testTasks, scope })

        await allSettled(handleToggle, { params: 1, scope })

        const finalTasks = scope.getState($taskList)

        expect(finalTasks![0].isDone).toBe(true)
    })
})
