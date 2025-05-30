import { createEvent, sample } from 'effector'

import {
    addFilters,
    type AddFilters,
    FilterNamesEnum,
    removeFilter,
    type RemoveFilter,
} from 'root/entities/task'

export const handleSubmit = createEvent<string>()

const checkIfEmpty = createEvent<string>()

sample({
    clock: handleSubmit,
    target: checkIfEmpty,
})

sample({
    clock: checkIfEmpty,
    filter: (title) => !!title.replace(' ', '').length,
    fn: (title): AddFilters => [
        { name: FilterNamesEnum.TITLE, payload: { title } },
    ],
    target: addFilters,
})

sample({
    clock: checkIfEmpty,
    filter: (title) => !title.replace(' ', '').length,
    fn: (): RemoveFilter => FilterNamesEnum.TITLE,
    target: removeFilter,
})
