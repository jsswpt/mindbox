import { useGate } from 'effector-react'
import { lazy, Suspense } from 'react'

import { pageGate } from '../model'
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

export const IndexPage = ({ isFallback }: IndexPageProps) => {
    useGate(pageGate)

    return isFallback ? (
        <Fallback />
    ) : (
        <Suspense fallback={<Fallback />}>
            <Component />
        </Suspense>
    )
}
