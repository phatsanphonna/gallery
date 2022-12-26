import type { GetServerSideProps, NextPage } from 'next'
import { Breakpoint, Plock } from 'react-plock'
import ImageCard from '../components/ImageCard'
import SEO from '../components/SEO'
import { Photo, PrismaClient } from '@prisma/client'

const breakpoints: Breakpoint[] = [
  { size: 640, columns: 1 },
  { size: 768, columns: 2 },
  { size: 1024, columns: 3 }
]

type Props = {
  pictures: Photo[] 
}
const HomePage: NextPage<Props> = ({ pictures }) => {
  return (
    <>
      <SEO />

      <div className='w-11/12 md:w-3/5 mx-auto min-h-screen mb-2'>
        <Plock breakpoints={breakpoints}>
          {pictures.map((pic, index) => (
            <ImageCard
              fileId={pic.fileId}
              id={pic.id}
              key={index}
              location={pic.location}
            />
          ))}
        </Plock>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient()

  const pictures = await prisma.photo.findMany({
    select: {
      fileId: true,
      id: true,
      location: true
    }
  })

  return {
    props: {
      pictures
    }
  }
}


export default HomePage
