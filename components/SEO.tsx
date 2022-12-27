import Head from 'next/head'

type Props = {
  title?: string,
  fileId?: string
}

const SEO: React.FC<Props> = ({
  title = 'Phatsanphon Gallery',
  fileId
}) => {
  return (
    <Head>
      <title>{title}</title>
      {fileId && <meta property='og:image' content={`https://drive.google.com/thumbnail?&sz=w1200&id=${fileId}`} />}
    </Head>
  )
}

export default SEO