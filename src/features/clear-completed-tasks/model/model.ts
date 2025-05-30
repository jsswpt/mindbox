import { createEvent, sample } from 'effector'

import { $taskList } from 'root/entities/task'

export const clearCompletedTasks = createEvent()

sample({
    clock: clearCompletedTasks,
    source: $taskList,
    filter: (taskList) => taskList !== null,
    fn: (taskList) => {
        const result = taskList!.filter((item) => !item.isDone)

        return result.length ? result : null
    },
    target: $taskList,
})
