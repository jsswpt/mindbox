import { Box, Container, Flex } from '@mantine/core'
import type React from 'react'

type TemplateProps = {
    title: React.ReactNode
    tasks: React.ReactNode
}

export const Template = ({ tasks, title }: TemplateProps) => (
    <Box component="main">
        <Container size="sm">
            <Flex mih="100svh" direction="column" justify="center" gap={16}>
                <Flex justify="center">{title}</Flex>
                <Box>{tasks}</Box>
            </Flex>
        </Container>
    </Box>
)
