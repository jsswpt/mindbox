import '@mantine/core/styles.css'

import { MantineThemeProvider } from '@mantine/core'

import { IndexPage } from 'root/screens/pages/root'

export const App = () => (
    <MantineThemeProvider>
        <IndexPage />
    </MantineThemeProvider>
)
