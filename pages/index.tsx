import type { NextPage } from 'next'
import { Breakpoint, Plock } from 'react-plock'
import ImageCard from '../components/ImageCard'
import SEO from '../components/SEO'

const pictures = [
  '1Z7jl9L-9wBY-FlJDvKDjC9lTtlwnw0mN',
  '1cB4YcQK1byKWKw63hbPR4SwJAARhWPzQ',
  '1Nx2aczsbsXNtLJqJT5KVCKBwu7hijKLr',
  '1wo1HE0KfFWiaFJCgiuP68d34wXe1SJ9f',
  '13a401Rop4jeP3mK7ga2qWVJIMxjmHZmL',
  '12_pEc_eBn-e1Gk-Gj-apv3cq8_5KAW5Y',
  '1sucLami5IopWB5Z2UNpocs8-tL4HpL1u',
  '1ztrSda9xUpBIINu8hnSeyujLew8zzvVC',
  '16dyRkyrFN4HdOWIc8b6wFfuqNWu7OJT0'
]

const breakpoints: Breakpoint[] = [
  { size: 640, columns: 1 },
  { size: 768, columns: 2 },
  { size: 1024, columns: 3 }
]

const Home: NextPage = () => {
  return (
    <>
      <SEO />
      <div className='w-3/5 mx-auto h-screen'>
        <Plock breakpoints={breakpoints}>
          {pictures.map((id, index) => (
            <ImageCard id={id} key={index} />
          ))}
        </Plock>
      </div>
    </>
  )
}

export default Home
