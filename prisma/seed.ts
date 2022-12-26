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
  '1Z7jl9L-9wBY-FlJDvKDjC9lTtlwnw0mN',
  '1cB4YcQK1byKWKw63hbPR4SwJAARhWPzQ',
  '1Nx2aczsbsXNtLJqJT5KVCKBwu7hijKLr',
  '1wo1HE0KfFWiaFJCgiuP68d34wXe1SJ9f',
  '13a401Rop4jeP3mK7ga2qWVJIMxjmHZmL',
  '12_pEc_eBn-e1Gk-Gj-apv3cq8_5KAW5Y',
  '1sucLami5IopWB5Z2UNpocs8-tL4HpL1u',
  '1ztrSda9xUpBIINu8hnSeyujLew8zzvVC',
  '16dyRkyrFN4HdOWIc8b6wFfuqNWu7OJT0',
  '1s1-9SdUjTip3s5QaGKSMSbu5yjMaVY7o'
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
          dateTime
        },
        update: {
          location: 'SIAMSCAPE',
          metadata: JSON.stringify(data.imageMediaMetadata),
          dateTime
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