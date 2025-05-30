import { CloseButton, Input } from '@mantine/core'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

import { handleSubmit } from '../model'
import { $taskFilterList, FilterTypesEnum } from 'root/entities/task'

export const SearchTask = () => {
    const [inputValue, setInputValue] = useState('')

    const filterList = useUnit($taskFilterList)

    const value =
        filterList && FilterTypesEnum.TITLE in filterList
            ? (filterList[FilterTypesEnum.TITLE]?.payload?.title ?? '')
            : ''

    useEffect(() => {
        setInputValue(value)
    }, [value])

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(inputValue)
            }}
            style={{ height: '100%', width: '100%' }}
        >
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
                autoFocus
                placeholder="Search by title"
                type="search"
                name="title"
                variant="unstyled"
                style={{ height: '100%', width: '100%' }}
                rightSection={
                    <CloseButton
                        onClick={() => {
                            handleSubmit('')
                        }}
                        style={{
                            display: inputValue ? undefined : 'none',
                            pointerEvents: 'all',
                        }}
                    />
                }
            />
        </form>
    )
}
