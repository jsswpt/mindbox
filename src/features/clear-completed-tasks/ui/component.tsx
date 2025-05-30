import { Button } from '@mantine/core'

import { handleClick } from '../model'

export const Component = () => (
    <Button
        onClick={() => handleClick()}
        size="xs"
        variant="transparent"
        color="red"
        fw="400"
    >
        Clear completed
    </Button>
)
