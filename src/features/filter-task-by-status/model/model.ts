import { createEvent, sample } from 'effector'

import {
    addFilters,
    type AddFilters,
    type FilterName,
    FilterTypesEnum,
    removeFilter,
    type RemoveFilter,
} from 'root/entities/task'

export const NONE = 'NONE'

export const handleChange = createEvent<FilterName | typeof NONE>()

const checkIfNone = createEvent<FilterName | typeof NONE>()

sample({
    clock: handleChange,
    target: checkIfNone,
})

sample({
    clock: checkIfNone,
    filter: (clk) => clk === NONE,
    fn: (): RemoveFilter => FilterTypesEnum.IS_DONE,
    target: removeFilter,
})

sample({
    clock: checkIfNone,
    filter: (clk) => clk !== NONE,
    fn: (clk): AddFilters => [{ name: clk as FilterName }],
    target: addFilters,
})
