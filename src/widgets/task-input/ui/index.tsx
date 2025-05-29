import { lazy, Suspense } from 'react'

import { Fallback } from './fallback'

const Component = lazy(() =>
    import('./component').then((m) => ({ default: m.Component }))
)

type TaskInputProps =
    | {
          isFallback: true
      }
    | {
          isFallback?: false
      }

export const TaskInput = ({ isFallback }: TaskInputProps) =>
    isFallback ? (
        <Fallback />
    ) : (
        <Suspense fallback={<Fallback />}>
            <Component />
        </Suspense>
    )
