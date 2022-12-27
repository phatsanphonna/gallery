import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { prisma } from '../../utils/prisma'
import { Photo } from '@prisma/client'
import moment from 'moment'
import { ImageMediaMetadata } from '../../types/ImageMediaMetadata'
const { Fraction } = require('fractional')
import SEO from '../../components/SEO'

type Props = {
  picture: Photo
}

const PhotosByIdPage: NextPage<Props> = ({ picture }) => {
  const metadata: ImageMediaMetadata = JSON.parse(picture.metadata!)

  return (
    <>
      <SEO title={
        picture.model
          ? `${picture.model} @${picture.location} - Phatsanphon Gallery`
          : `@${picture.location} - Phatsanphon Gallery`
      } />
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom,#00000018,#000000f2), url(https://drive.google.com/uc?export=view&id=${picture.fileId})`
        }}
        className='h-screen bg-cover bg-center bg-no-repeat mb-auto'
      >

        <div className='flex flex-col w-full h-full justify-end items-left gap-2 text-white p-8'>
          <p className='font-normal'>{moment(picture.dateTime).format('DD/MM/YYYY')}</p>
          <h2 className='font-black text-2xl md:text-4xl'>{picture.model}</h2>
        </div>
        <div className='w-full text-left flex flex-col gap-4 p-8'>

          <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-4'>
            {picture.model && (
              <div>
                <h3 className='font-bold text-2xl'>Model</h3>
                <p className='font-normal'>{picture.model}</p>
              </div>
            )}

            <div>
              <h3 className='font-bold text-2xl'>Date</h3>
              <p className='font-normal'>{moment(picture.dateTime).format('DD/MM/YYYY')}</p>
            </div>

            {picture.events && (
              <div>
                <h3 className='font-bold text-2xl'>Event</h3>
                <p className='font-normal'>{picture.events}</p>
              </div>
            )}

            <div>
              <h3 className='font-bold text-2xl'>Location</h3>
              <a
                className='font-normal cursor-pointer underline'
                href={`https://www.google.com/maps?q=${picture.location}`}
                target='_blank'
                rel="noreferrer"
              >
                {picture.location}
              </a>
            </div>

            <div>
              <h3 className='font-bold text-2xl'>Camera</h3>
              <p className='font-normal'>{metadata.cameraMake}</p>
              <p className='font-normal'>{metadata.cameraModel}</p>
            </div>

            <div>
              <h3 className='font-bold text-2xl'>Lens</h3>
              <p className='font-normal'>{metadata.focalLength}mm, f/{metadata.aperture}</p>
              <p className='font-normal'>{new Fraction(metadata.exposureTime).toString()}s</p>
              <p className='font-normal'>ISO {metadata.isoSpeed}</p>
            </div>

            <div>
              <h3 className='font-bold text-2xl'>Download</h3>
              <a
                download
                className='underline'
                href={`https://drive.google.com/uc?export=download&id=${picture.fileId}`}>
                {metadata.width}x{metadata.height}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const picture = await prisma.photo.findUnique({
    where: {
      id: params!.id as string
    }
  })

  await prisma.$disconnect()
  return {
    props: {
      picture
    }
  }
}


export const getStaticPaths: GetStaticPaths = async () => {
  const queryPaths = await prisma.photo.findMany({
    select: {
      id: true
    }
  })

  const paths = queryPaths.map((path) => ({ params: { id: path.id } }))

  await prisma.$disconnect()

  return {
    paths: paths,
    fallback: true,
  }
}
export default PhotosByIdPage