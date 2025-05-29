import { lazy, Suspense } from 'react'

import { Fallback } from './fallback'

const Component = lazy(() =>
    import('./component').then((m) => ({ default: m.Component }))
)

type TasksLeftProps =
    | {
          isFallback: true
      }
    | {
          isFallback?: false
      }

export const TasksLeft = ({ isFallback }: TasksLeftProps) =>
    isFallback ? (
        <Fallback />
    ) : (
        <Suspense fallback={<Fallback />}>
            <Component />
        </Suspense>
    )
