import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Layout from '@shared/Layout'
import globalStyles from '@styles/globalStyles'

const client = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <QueryClientProvider client={client}>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </Layout>
  )
}
