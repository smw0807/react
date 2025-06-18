import Head from 'next/head'
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <title>My Account</title>
        <meta name="description" content="내 자산 관리를 보다 쉽게 !" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </div>
  )
}

export default Layout
