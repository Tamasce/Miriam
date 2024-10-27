'use client'
import React from 'react'
import { BackgroundBeamsWithCollision } from './ui/beams'
import { useGSAP } from '@gsap/react'
import { animateWithGsap } from '@/data/aniamtion'
import { ParallaxScroll } from './ui/paralax'
import { images } from '@/data'



const  Lavori = () => {
  useGSAP(()=>{
    animateWithGsap('#work', {y:0, opacity:1, duration: 2})
    animateWithGsap('#work2', {y:0, opacity:1, duration: 2, delay: 1, ease: 'power2'})
  },[])
  return (
    <BackgroundBeamsWithCollision id='lavori'>
      <div className='h-screen flex flex-col  justify-center items-center'>
        <div className='text-[50px] md:text-[70px] lg:text-[90px] font-semibold opacity-0 flex text-center justify-center absolute top-0' id='work'>
              Selected <span className='ml-1 md:ml-2 bg-gradient-to-b text-transparent bg-clip-text from-black via-gray-600 to-gray-40'>works</span>
        </div>
          <div className='flex flex-col items-center justify-center opacity-0' id='work2'>
            <p className='font-semibold '>
              Dai un'occhiata ad alcuni dei miei lavori ✦
            </p>
            <div className='font-normal flex items-center text-center justify-center w-[320px] max-w-full text-gray-600 pb-5'>
              Ogni lavoro racconta il mio percorso creativo e la dedizione nel trasformare idee in realtà.
            </div>
          </div>
          <ParallaxScroll images={images}/>
        </div>
    </BackgroundBeamsWithCollision>
  )
}

export default Lavori