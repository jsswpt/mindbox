import { Input } from '@mantine/core'
import { useState } from 'react'

import { addTask } from '../model'

export const CreateTask = () => {
    const [title, setTitle] = useState('')

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()

                if (title.replace(' ', '').length) {
                    addTask(title)
                    setTitle('')
                }
            }}
            style={{ height: '100%', width: '100%' }}
        >
            <Input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                placeholder="What needs to be done?"
                type="text"
                name="title"
                id="create-task-input"
                variant="unstyled"
                style={{ height: '100%', width: '100%' }}
            />
        </form>
    )
}
