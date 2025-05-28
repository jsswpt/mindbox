import type { TaskFilterList } from '../model/model.type'

export const getCachedKey = (
    taskList: Array<unknown> | null,
    taskFilterList: TaskFilterList | null
) => JSON.stringify(taskList?.length ?? 0) + [JSON.stringify(taskFilterList)]
