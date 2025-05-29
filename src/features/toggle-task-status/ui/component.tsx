import { CheckIcon, Radio } from '@mantine/core'

export type ComponentProps = {
    isDone: boolean
    id: number
}

export const Component = ({ id, isDone }: ComponentProps) => (
    <Radio
        id={id.toString()}
        checked={isDone}
        icon={CheckIcon}
        color="cyan"
        variant="outline"
        size="lg"
    />
)
