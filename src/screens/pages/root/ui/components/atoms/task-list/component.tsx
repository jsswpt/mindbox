import { Flex, Title } from '@mantine/core'
import { useUnit } from 'effector-react'

import { $currentTaskList } from 'root/entities/task'
import { TaskItem } from 'root/widgets'

export const Component = () => {
    const tasks = useUnit($currentTaskList)

    return (
        <>
            {tasks && tasks.length ? (
                <Flex direction="column" gap={1} key={'yes'}>
                    {tasks.map(({ id, isDone, title }) => (
                        <TaskItem
                            id={id}
                            isDone={isDone}
                            title={title}
                            key={id}
                        />
                    ))}
                </Flex>
            ) : (
                <Flex
                    h="100%"
                    w="100%"
                    align="center"
                    justify="center"
                    key={'no'}
                >
                    <Title order={2} c="gray">
                        {tasks
                            ? `Current list is empty`
                            : `Create your first task`}
                    </Title>
                </Flex>
            )}
        </>
    )
}
