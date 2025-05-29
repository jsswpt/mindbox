import { TaskList, TasksLeft } from '../..'
import { Template } from './template'
import { ClearCompletedTasks, FilterTaskByStatus } from 'root/features'
import { TaskInput } from 'root/widgets'

export const Fallback = () => (
    <Template
        statusFilter={<FilterTaskByStatus isFallback />}
        taskInput={<TaskInput isFallback />}
        list={<TaskList isFallback />}
        clearCompleted={<ClearCompletedTasks isFallback />}
        tasksLeft={<TasksLeft isFallback />}
    />
)
