import { Skeleton } from '@mantine/core'

import { TaskCard } from './components'
import { Template } from './template'

export const Fallback = () => (
    <Template
        tasks={<TaskCard isFallback />}
        title={<Skeleton width={180} height={48} />}
    />
)
