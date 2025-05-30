import { Box, Flex } from '@mantine/core'
import type React from 'react'

type TemplateProps = {
    tumbler: React.ReactNode
    input: React.ReactNode
}

export const Template = ({ input, tumbler }: TemplateProps) => (
    <Flex align="center" gap={4}>
        <Box w={44} h={44}>
            {tumbler}
        </Box>
        {input}
    </Flex>
)
