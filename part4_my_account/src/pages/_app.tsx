import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { SessionProvider } from 'next-auth/react'

import Layout from '@shared/Layout'
import globalStyles from '@styles/globalStyles'

const client = new QueryClient()

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  console.log('__app')
  return (
    <Layout>
      <QueryClientProvider client={client}>
        <Global styles={globalStyles} />
        <SessionProvider session={session}>
          <Hydrate state={dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </SessionProvider>
      </QueryClientProvider>
    </Layout>
  )
}
