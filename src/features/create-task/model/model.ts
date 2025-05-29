import { createEvent } from 'effector'

import { $taskList } from 'root/entities/task'

export const addTask = createEvent<string>()

$taskList.on(addTask, (state, payload) => {
    return [...(state ?? []), { title: payload, id: Date.now(), isDone: false }]
})
