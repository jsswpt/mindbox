import { Input } from '@mantine/core'

export const CreateTask = () => {
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            style={{ height: '100%', width: '100%' }}
        >
            <Input
                autoFocus
                placeholder="What needs to be done?"
                type="text"
                name="title"
                variant="unstyled"
                style={{ height: '100%', width: '100%' }}
            />
        </form>
    )
}
