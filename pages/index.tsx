import type { GetServerSideProps, NextPage } from 'next'
import { Breakpoint, Plock } from 'react-plock'
import ImageCard from '../components/ImageCard'
import SEO from '../components/SEO'
import { Photo } from '@prisma/client'
import { prisma } from '../utils/prisma'
import Layout from '../components/Layout'

const breakpoints: Breakpoint[] = [
  { size: 640, columns: 1 },
  { size: 768, columns: 2 },
  { size: 1024, columns: 3 },
  { size: 1280, columns: 3 }
]

type Props = {
  pictures: Photo[]
}
const HomePage: NextPage<Props> = ({ pictures }) => {
  return (
    <>
      <SEO />

      <Layout>
        <Plock breakpoints={breakpoints}>
          {pictures.map((pic, index) => (
            <ImageCard
              fileId={pic.fileId}
              id={pic.id}
              key={index}
              location={pic.location}
              dateTime={pic.dateTime}
            />
          ))}
        </Plock>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const pictures = await prisma.photo.findMany({
    select: {
      fileId: true,
      id: true,
      location: true,
      dateTime: true
    },
    orderBy: {
      dateTime: 'desc'
    }
  })

  await prisma.$disconnect()

  return {
    props: {
      pictures
    }
  }
}


export default HomePage
