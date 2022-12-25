import { GetServerSideProps, NextPage } from 'next'
import React from 'react'

type Props = {
  fileId: string
}

const PhotosByIdPage: NextPage<Props> = ({ fileId }) => {
  return (
    <div>{fileId}</div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      fileId: params!.id
    }
  }
}

export default PhotosByIdPage