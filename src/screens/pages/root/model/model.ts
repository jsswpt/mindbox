import { sample } from 'effector'
import { createGate } from 'effector-react'

import { $getTasksFx } from 'root/entities/task'

export const pageGate = createGate()

sample({
    clock: pageGate.open,
    target: $getTasksFx,
})
