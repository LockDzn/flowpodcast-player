import Head from 'next/head'

type Props = {
  title: string
}

const Layout = ({ title }: Props) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>

      <meta property="og:url" content="https://flowpodcast.vercel.app/" key="ogurl" />
      {/* <meta property="og:image" content={previewImage} key="ogimage" /> */}
      <meta property="og:site_name" content="Flow Podcast Player" key="ogsitename" />
      <meta property="og:title" content="Flow Podcast - Player" key="ogtitle" />
      <meta property="og:description" content="Player de audio para o Flow Podcast" key="ogdesc" />

      <title>{title}</title>
    </Head>
  )
}

export default Layout