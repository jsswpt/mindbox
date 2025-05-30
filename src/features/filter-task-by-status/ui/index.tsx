import { lazy, Suspense } from 'react'

import { Fallback } from './fallback'

const Component = lazy(() =>
    import('./component').then((m) => ({ default: m.Component }))
)

type FilterTaskByStatusProps =
    | {
          isFallback: true
      }
    | {
          isFallback?: false
      }

export const FilterTaskByStatus = ({ isFallback }: FilterTaskByStatusProps) =>
    isFallback ? (
        <Fallback />
    ) : (
        <Suspense fallback={<Fallback />}>
            <Component />
        </Suspense>
    )
