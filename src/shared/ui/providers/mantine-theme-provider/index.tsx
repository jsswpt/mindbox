import { MantineProvider } from '@mantine/core'
import type React from 'react'

import { theme } from 'root/shared/configs'

export type MantineThemeProviderProps = {
    children: React.ReactNode
}

export const MantineThemeProvider = ({
    children,
}: MantineThemeProviderProps) => (
    <MantineProvider theme={theme}>{children}</MantineProvider>
)
