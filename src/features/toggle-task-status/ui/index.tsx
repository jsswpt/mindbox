import { lazy, Suspense } from 'react'

import { Fallback } from './fallback'

const Component = lazy(() =>
    import('./component').then((m) => ({ default: m.Component }))
)

type Props = {
    id: number
    isDone: boolean
}

type ToggleTaskStatusProps =
    | {
          isFallback: true
      }
    | ({
          isFallback?: false
      } & Props)

export const ToggleTaskStatus = ({
    isFallback,
    ...rest
}: ToggleTaskStatusProps) =>
    isFallback ? (
        <Fallback />
    ) : (
        <Suspense fallback={<Fallback />}>
            <Component {...(rest as Props)} />
        </Suspense>
    )
