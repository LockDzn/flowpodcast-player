import Head from 'next/head'

const Layout = () => {
  return (
    <div>
      <Head>
        <html lang="pt-br" />
        
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>

        <title>Flow Podcast - Player</title>
      </Head>
    </div>
  )
}

export default Layout