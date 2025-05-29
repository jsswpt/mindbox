import { createTheme, getFontSize } from '@mantine/core'

export const theme = createTheme({
    fontFamily: 'Raleway',
    headings: {
        sizes: {
            h1: {
                fontSize: getFontSize(64),
                fontWeight: '200',
            },
            h2: {
                fontSize: getFontSize(24),
                fontWeight: '200',
            },
        },
    },
})
