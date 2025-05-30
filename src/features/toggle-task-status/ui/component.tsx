import { Checkbox } from '@mantine/core'

import { handleToggle } from '../model'

export type ComponentProps = {
    isDone: boolean
    id: number
}

export const Component = ({ id, isDone }: ComponentProps) => {
    return (
        <Checkbox
            id={id.toString()}
            checked={isDone}
            onChange={() => handleToggle(id)}
            color="blue"
            variant="outline"
            size="lg"
            radius="xl"
        />
    )
}
