import { ActionIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPencil, IconSearch } from '@tabler/icons-react'

import { Template } from './template'
import { CreateTask, SearchTask } from 'root/features'

export const Component = () => {
    const [isSearch, { toggle }] = useDisclosure(false)

    return (
        <Template
            tumbler={
                <ActionIcon
                    onClick={toggle}
                    size="xl"
                    variant="transparent"
                    c={isSearch ? 'teal' : 'blue'}
                >
                    {isSearch ? <IconSearch /> : <IconPencil />}
                </ActionIcon>
            }
            input={isSearch ? <SearchTask /> : <CreateTask />}
        />
    )
}
