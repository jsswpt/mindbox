import { lazy, Suspense } from 'react'

import { Fallback } from './fallback'

const Component = lazy(() =>
    import('./component').then((m) => ({ default: m.Component }))
)

type TaskListProps =
    | {
          isFallback: true
      }
    | {
          isFallback?: false
      }

export const TaskList = ({ isFallback }: TaskListProps) =>
    isFallback ? (
        <Fallback />
    ) : (
        <Suspense fallback={<Fallback />}>
            <Component />
        </Suspense>
    )
