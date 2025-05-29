import 'root/index.css'

import { IndexPage } from 'root/screens/pages/root'
import { MantineThemeProvider } from 'root/shared/ui'

export const App = () => (
    <MantineThemeProvider>
        <IndexPage />
    </MantineThemeProvider>
)
