import { Text } from '@mantine/core'

import { Template } from './template'
import { ToggleTaskStatus } from 'root/features'

type ComponentProps = {
    id: number
    isDone: boolean
    title: string
}

export const Component = ({ id, isDone, title }: ComponentProps) => (
    <Template
        radio={<ToggleTaskStatus id={id} isDone={isDone} />}
        title={
            <Text size="xl" c="dark">
                {title}
            </Text>
        }
    />
)
