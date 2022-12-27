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
      <meta name='twitter:title' content={title} />
      {fileId && (
        <>
          <meta name='twitter:image:src' content={`https://drive.google.com/thumbnail?&sz=w1200&id=${fileId}`} />
          <meta name="twitter:card" content="summary_large_image" />
        </>
      )}
      <meta name="theme-color" content="#1d1d1d"/>
    </Head>
  )
}

export default SEO