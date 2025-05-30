import { allSettled, fork } from 'effector'
import { describe, expect, test } from 'vitest'

import { addTask } from './model'
import { $taskList, type Task } from 'root/entities/task'

describe('create-task', () => {
    test("Check if 'addTask' works correctly", async () => {
        const scope = fork()

        const testTask: Task = {
            id: 1,
            isDone: false,
            title: 'Test task',
        }

        await allSettled(addTask, {
            params: testTask.title,
            scope,
        })

        const finalTasks = scope.getState($taskList)

        // eslint-disable-next-line
        const { id: deleted, ...expectedData } = testTask

        expect(finalTasks![0]).contains(expectedData)
    })
})
