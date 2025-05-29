import { Flex } from '@mantine/core'
import type React from 'react'

type TemplateProps = {
    tumbler: React.ReactNode
    input: React.ReactNode
}

export const Template = ({ input, tumbler }: TemplateProps) => (
    <Flex align="center" gap={4}>
        {tumbler}
        {input}
    </Flex>
)
