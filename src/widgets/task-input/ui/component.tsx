import { ActionIcon, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPencil, IconSearch } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import { Template } from './template'
import { CreateTask, SearchTask } from 'root/features'

export const Component = () => {
    const [isToggled, setIsToggled] = useState(false)
    const [isSearch, { toggle }] = useDisclosure(false)

    const tooltipProps = !isToggled
        ? { opened: !isToggled, label: "I'm changing the mode" }
        : {
              label: isSearch ? 'Search task' : 'Create task',
          }

    useEffect(() => {
        if (isSearch) {
            setIsToggled(true)
        }
    }, [isSearch])

    return (
        <Template
            tumbler={
                <Tooltip
                    {...tooltipProps}
                    withArrow
                    position="top-start"
                    arrowOffset={21}
                >
                    <ActionIcon
                        onClick={toggle}
                        size="xl"
                        variant="transparent"
                        c={isSearch ? 'teal' : 'blue'}
                    >
                        {isSearch ? <IconSearch /> : <IconPencil />}
                    </ActionIcon>
                </Tooltip>
            }
            input={isSearch ? <SearchTask /> : <CreateTask />}
        />
    )
}
