import { Flex } from '@mantine/core'
import type React from 'react'

type TemplateProps = {
    items: React.ReactNode
}

export const Template = ({ items }: TemplateProps) => (
    <Flex align="center" gap={4}>
        {items}
    </Flex>
)
