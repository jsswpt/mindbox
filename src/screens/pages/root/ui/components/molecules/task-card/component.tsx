import { TaskList, TasksLeft } from '../..'
import { Template } from './template'
import { ClearCompletedTasks, FilterTaskByStatus } from 'root/features'
import { TaskInput } from 'root/widgets'

export const Component = () => (
    <Template
        statusFilter={<FilterTaskByStatus />}
        taskInput={<TaskInput />}
        list={<TaskList />}
        clearCompleted={<ClearCompletedTasks />}
        tasksLeft={<TasksLeft />}
    />
)
