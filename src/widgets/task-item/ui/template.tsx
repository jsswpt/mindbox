import { Box, Flex, Paper } from '@mantine/core'

import { TASK_ITEM_H } from '.'

type TemplateProps = {
    radio: React.ReactNode
    title: React.ReactNode
}

export const Template = ({ radio, title }: TemplateProps) => (
    <Paper px={16} radius="xs" shadow="xs">
        <Flex h={TASK_ITEM_H} align="center" direction="row" gap={16}>
            <Flex w={44} h={44} align="center" justify="center">
                {radio}
            </Flex>
            <Box flex={1} style={{ overflow: 'hidden' }}>
                {title}
            </Box>
        </Flex>
    </Paper>
)
