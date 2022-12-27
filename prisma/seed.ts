import { Photo, PrismaClient } from '@prisma/client'
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
  '1s77p7zyJABDTXdAmmCe_b8li7tPbCGJv',
  '1ZW4MEDVlyZACS0CCOFq0SfHIOADeBAt6'
]

async function main() {
  const seedList: Photo[] = []

  for (let fileId of pictures) {
    drive.files.get({
      fileId: fileId,
      fields: 'id,name,mimeType,imageMediaMetadata'
    }).then(async ({ data }) => {
      const dateTime = moment(
        data.imageMediaMetadata?.time,
        'YYYY:MM:DD hh:mm:ss'
      ).utcOffset('+0700').toISOString()

      const pic = await prisma.photo.upsert({
        where: { fileId },
        create: {
          fileId,
          location: 'SIAMSCAPE',
          metadata: JSON.stringify(data.imageMediaMetadata),
          dateTime,
          events: 'Cosnatsu Xmas'
        },
        update: {
          location: 'SIAMSCAPE',
          metadata: JSON.stringify(data.imageMediaMetadata),
          dateTime,
        }
      })

      seedList.push(pic)
    })
  }
  console.log(seedList);


}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })