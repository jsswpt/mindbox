import { Skeleton } from '@mantine/core'

import { Template } from './template'
import { ToggleTaskStatus } from 'root/features'

export const Fallback = () => (
    <Template
        radio={<ToggleTaskStatus isFallback />}
        title={<Skeleton height={20} width="100%" />}
    />
)
