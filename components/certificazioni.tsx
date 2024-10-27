'use client'
import React from 'react'
import { LayoutGrid } from './ui/layout-grid'
import {cards} from './ui/layout-grid'
import { useGSAP } from '@gsap/react'
import { animateWithGsap } from '@/data/aniamtion'

const Certificazioni = () => {
  useGSAP(()=>{
    animateWithGsap('#certificazioni', {y:0, opacity:1, duration: 2})
    animateWithGsap('#certificazioni2', {y:0, opacity:1, duration: 2, delay: 1, ease: 'power2'})
  },[])
  return (
    <div className='h-screen bg-neutral-100 relative flex flex-col'>
      <div className='text-[50px] md:text-[70px] lg:text-[90px] font-semibold opacity-0 flex text-center justify-center' id='certificazioni'>
              Certificazioni 
        </div>
          <div className='flex flex-col items-center justify-center opacity-0' id='certificazioni2'>
            <p className='font-normal '>
              Dai un'occhiata a tutte le mie certificazioni ✦
            </p>
            
          </div>
      <LayoutGrid cards={cards} />
    </div>
  )
}

export default Certificazioni