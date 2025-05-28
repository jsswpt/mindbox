import { lazy, Suspense } from 'react'

import { Fallback } from './fallback'

const Component = lazy(() =>
    import('./component').then((m) => ({ default: m.Component }))
)

type IndexPageProps =
    | {
          isFallback: true
      }
    | {
          isFallback?: false
      }

export const IndexPage = ({ isFallback }: IndexPageProps) =>
    isFallback ? (
        <Fallback />
    ) : (
        <Suspense fallback={<Fallback />}>
            <Component />
        </Suspense>
    )
