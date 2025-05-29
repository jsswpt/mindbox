import { Title } from '@mantine/core'

import { TaskCard } from './components'
import { Template } from './template'

export const Component = () => (
    <Template
        tasks={<TaskCard />}
        title={
            <Title order={1} c="gray">
                Todos
            </Title>
        }
    />
)
