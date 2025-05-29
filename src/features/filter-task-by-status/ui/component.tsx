import { Chip, NativeSelect, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

import { Template } from './template'

const filterNameToTitle = {
    NONE: 'All',
    ACTIVE: 'Active',
    DONE: 'Done',
}

type Filter = { title: string; value: string }

const filters = Object.entries(filterNameToTitle).reduce(
    (acc, [value, title]) => [...acc, { title, value }],
    [] as Filter[]
)

export const Component = () => {
    const theme = useMantineTheme()

    const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`)

    return (
        <Template
            items={
                isDesktop ? (
                    <Chip.Group
                        multiple={false}
                        defaultValue="NONE"
                        key={JSON.stringify(isDesktop)}
                    >
                        {filters.map(({ title, value }) => (
                            <Chip
                                value={value}
                                variant="outline"
                                color="gray"
                                size="xs"
                                key={value}
                            >
                                {title}
                            </Chip>
                        ))}
                    </Chip.Group>
                ) : (
                    <NativeSelect
                        size="xs"
                        data={filters.map(({ title: label, value }) => ({
                            label,
                            value,
                        }))}
                        key={JSON.stringify(isDesktop)}
                    />
                )
            }
        />
    )
}
