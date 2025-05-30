import { lazy, Suspense } from 'react'

import { Fallback } from './fallback'

const Component = lazy(() =>
    import('./component').then((m) => ({ default: m.Component }))
)

type ClearCompletedTasksProps =
    | {
          isFallback: true
      }
    | {
          isFallback?: false
      }

export const ClearCompletedTasks = ({
    isFallback,
}: ClearCompletedTasksProps) =>
    isFallback ? (
        <Fallback />
    ) : (
        <Suspense fallback={<Fallback />}>
            <Component />
        </Suspense>
    )
