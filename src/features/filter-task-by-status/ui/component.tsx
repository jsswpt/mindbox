import { Chip, NativeSelect, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useUnit } from 'effector-react'

import { handleChange, NONE } from '../model/model'
import { Template } from './template'
import {
    $taskFilterList,
    type FilterName,
    FilterNamesEnum,
    FilterTypesEnum,
} from 'root/entities/task'

const filterNameToTitle = {
    [NONE]: 'All',
    [FilterNamesEnum.ACTIVE]: 'Active',
    [FilterNamesEnum.DONE]: 'Done',
}

type Filter = { title: string; value: string }

const filters = Object.entries(filterNameToTitle).reduce(
    (acc, [value, title]) => [...acc, { title, value }],
    [] as Filter[]
)

export const Component = () => {
    const theme = useMantineTheme()

    const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`)

    const filterList = useUnit($taskFilterList)

    const value =
        filterList && FilterTypesEnum.IS_DONE in filterList
            ? (filterList[FilterTypesEnum.IS_DONE]?.name ?? NONE)
            : NONE

    return (
        <Template
            items={
                isDesktop ? (
                    <Chip.Group
                        multiple={false}
                        defaultValue={NONE}
                        value={value}
                        onChange={(e) => {
                            handleChange(e as FilterName | typeof NONE)
                        }}
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
