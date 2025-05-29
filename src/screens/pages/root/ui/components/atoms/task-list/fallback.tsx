import { Box, Flex } from '@mantine/core'

import { TaskItem } from 'root/widgets'

const item = (
    <Box component="li">
        <TaskItem isFallback />
    </Box>
)

export const Fallback = () => (
    <Flex direction="column" gap={1}>
        {item}
        {item}
        {item}
        {item}
    </Flex>
)
