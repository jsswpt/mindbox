import { lazy, Suspense } from 'react'

import { Fallback } from './fallback'

const Component = lazy(() =>
    import('./component').then((m) => ({ default: m.Component }))
)

type Props = {
    id: number
    isDone: boolean
    title: string
}

type TaskCardProps =
    | {
          isFallback: true
      }
    | ({
          isFallback?: false
      } & Props)

export const TASK_ITEM_H = 56

export const TaskItem = ({ isFallback, ...rest }: TaskCardProps) =>
    isFallback ? (
        <Fallback />
    ) : (
        <Suspense fallback={<Fallback />}>
            <Component {...(rest as Props)} />
        </Suspense>
    )
