import type { TaskFilterList } from '../model/model.type'

export const getCachedKey = (
    taskList: Array<unknown> | null,
    taskFilterList: TaskFilterList | null
) =>
    JSON.stringify(taskList) +
    [
        JSON.stringify(
            Object.entries(taskFilterList ?? {}).sort((a, b) => {
                return a[0].localeCompare(b[0])
            })
        ),
    ]
