import { Flex, Skeleton } from '@mantine/core'

import { Template } from './template'

export const Fallback = () => (
    <Template
        tumbler={
            <Flex h={42} w={42} align="center" justify="center">
                <Skeleton h={24} w={24} circle />
            </Flex>
        }
        input
    />
)
