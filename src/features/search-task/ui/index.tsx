import { Input } from '@mantine/core'

export const SearchTask = () => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
            }}
            style={{ height: '100%', width: '100%' }}
        >
            <Input
                autoFocus
                placeholder="Search by title"
                type="text"
                name="title"
                variant="unstyled"
                style={{ height: '100%', width: '100%' }}
            />
        </form>
    )
}
