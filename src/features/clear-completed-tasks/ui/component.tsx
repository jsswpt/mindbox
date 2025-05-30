import { Button } from '@mantine/core'

import { clearCompletedTasks } from '../model'

export const Component = () => (
    <Button
        onClick={() => clearCompletedTasks()}
        size="xs"
        variant="transparent"
        color="red"
        fw="400"
    >
        Clear completed
    </Button>
)
