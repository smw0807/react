import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { SessionProvider } from 'next-auth/react'

import Layout from '@shared/Layout'
import globalStyles from '@styles/globalStyles'

import AuthGuard from '@components/auth/AuthGuard'
import NavBar from '@components/shared/NavBar'
import { AlertContextProvider } from '@contexts/AlertContext'

const client = new QueryClient()

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <QueryClientProvider client={client}>
        <Global styles={globalStyles} />
        <SessionProvider session={session}>
          <Hydrate state={dehydratedState}>
            <AlertContextProvider>
              <AuthGuard>
                <NavBar />
                <Component {...pageProps} />
              </AuthGuard>
            </AlertContextProvider>
          </Hydrate>
        </SessionProvider>
      </QueryClientProvider>
    </Layout>
  )
}
