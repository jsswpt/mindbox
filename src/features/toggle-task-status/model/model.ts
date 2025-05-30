import { createEvent, sample } from 'effector'

import { $taskList } from 'root/entities/task'

export const handleToggle = createEvent<number>()

sample({
    clock: handleToggle,
    source: $taskList,
    fn: (taskList, id) =>
        taskList!.map((item) =>
            item.id === id ? { ...item, isDone: !item.isDone } : item
        ),
    target: $taskList,
})
