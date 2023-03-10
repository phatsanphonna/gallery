import { PrismaClient } from '@prisma/client'
import { google } from 'googleapis'
import moment from 'moment'

const prisma = new PrismaClient()

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.metadata'
]

const auth = new google.auth.GoogleAuth({
  scopes: SCOPES,
  keyFile: process.env.GOOGLEAPIS_SECRET
})

const drive = google.drive({ auth, version: 'v3' })

const pictures = [
  '1LH7bXvl_wqAMYfNgFXKrdAmmIZpZwG5U',
  '1CiZ_eszTjh8it5F5b8rFI7tOKAyVWeJ9',
  '1OKNAchtaDF1_N5ue4jtD6zxcDNMfGFbU'
]

async function addPhotos() {
  for (let fileId of pictures) {
    drive.files.get({
      fileId: fileId,
      fields: 'id,name,mimeType,imageMediaMetadata'
    }).then(async ({ data }) => {
      const dateTime = moment(
        data.imageMediaMetadata?.time,
        'YYYY:MM:DD hh:mm:ss'
      ).utcOffset('+0700').toISOString()

      await prisma.photo.upsert({
        where: { fileId },
        create: {
          fileId,
          location: 'BTS National Stadium',
          metadata: JSON.stringify(data.imageMediaMetadata),
          dateTime,
        },
        update: {
          metadata: JSON.stringify(data.imageMediaMetadata),
          dateTime,
        }
      })
    })
  }
}

async function createAlbums() {
  await prisma.album.create({
    data: {
      title: 'Nero from Black Covers',
      photosId: [
        '63a938b67e6a304dadcf12c7',
        '63ab0ffbf9a1353bf23ab3aa'
      ]
    }
  })
}

function main(fn: () => any) {
  fn()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e: any) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
}

main(createAlbums)
