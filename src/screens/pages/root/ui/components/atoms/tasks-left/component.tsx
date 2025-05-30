import { Text } from '@mantine/core'
import { useUnit } from 'effector-react'

import { $tasksLeft } from 'root/entities/task'

export const Component = () => {
    const tasksLeft = useUnit($tasksLeft)

    return (
        <Text size="sm" c="gray">
            {tasksLeft ? tasksLeft : 'No'} items left
        </Text>
    )
}
