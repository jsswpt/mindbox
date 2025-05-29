import { Skeleton, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

import { Template } from './template'

export const Fallback = () => {
    const theme = useMantineTheme()

    const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`)

    return (
        <Template
            items={
                isDesktop ? (
                    <>
                        <Skeleton width={64} height={24} radius="xl" />
                        <Skeleton width={64} height={24} radius="xl" />
                        <Skeleton width={64} height={24} radius="xl" />
                    </>
                ) : (
                    <Skeleton width={64} height={24} radius="xl" />
                )
            }
        />
    )
}
