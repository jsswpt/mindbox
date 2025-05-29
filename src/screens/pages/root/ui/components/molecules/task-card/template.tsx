import { Box, Flex, Paper } from '@mantine/core'
import type React from 'react'

import { TASK_ITEM_H } from 'root/widgets'

type TemplateProps = {
    taskInput: React.ReactNode
    list: React.ReactNode
    tasksLeft: React.ReactNode
    statusFilter: React.ReactNode
    clearCompleted: React.ReactNode
}

export const Template = ({
    clearCompleted,
    list,
    statusFilter,
    taskInput,
    tasksLeft,
}: TemplateProps) => (
    <Box pos="relative">
        <Paper withBorder style={{ overflow: 'hidden' }}>
            <Paper px={8} shadow="xs" radius="xs" mb={1}>
                {taskInput}
            </Paper>
            <Paper
                shadow="xs"
                radius="xs"
                h={(TASK_ITEM_H + 1) * 5}
                mah={'50svh'}
                mb={1}
                style={{
                    overflowY: 'auto',
                }}
            >
                {list}
            </Paper>
            <Paper px={8} py={8} shadow="xs" radius="xs">
                <Flex align="center" justify="space-between">
                    <Box>{tasksLeft}</Box>
                    <Box>{statusFilter}</Box>
                    <Box>{clearCompleted}</Box>
                </Flex>
            </Paper>
        </Paper>
        <Paper
            pos="absolute"
            top="100%"
            left="50%"
            h={8}
            w="99%"
            withBorder
            style={{ transform: 'translate(-50%, -50%)', zIndex: -1 }}
        />
        <Paper
            pos="absolute"
            top="100%"
            left="50%"
            h={8}
            w="98%"
            withBorder
            style={{ transform: 'translate(-50%, 0)', zIndex: -2 }}
        />
    </Box>
)
