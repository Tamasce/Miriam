"use client"
import React from 'react'
import { AuroraBackground } from './ui/aurora-background'
import { words } from '@/data'
import { FlipWords } from './ui/flip-words'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { HoverBorderGradient } from './ui/button'
import { Navbar, NavbarDemo } from './Navbar'
import { NavbarProvider } from './ui/NavbarContext'
import { ExpandableCardDemo } from './ui/dialog'
import { animateWithGsap } from '@/data/aniamtion'




const Hero = () => {
  useGSAP(()=>{
    gsap.fromTo("#hero",{opacity: 0, y:100,},{opacity: 1, y:0, ease:'back.inOut'})
    animateWithGsap('#servizi', {y:0, opacity:1, duration: 2})
  })
  
  return (
    <div>
      <NavbarProvider>

      <AuroraBackground>
        <NavbarDemo />
      <div className=" flex flex-col items-center justify-center">   
        
          <FlipWords words={words} className='text-[110px] md:text-[150px] lg:text-[250px] flex-col md:flex-row md:leading-tight max-w-5xl mx-auto text-center justify-center tracking-tight font-medium flex items-center gap-2 md:gap-8'/>
          <div id='hero' className='flex flex-col items-center justify-center'>
        <div className="font-normal text-base md:text-4xl dark:text-neutral-200">
          Sono Miriam Stancampiano
        </div>
       
        <div className="font-light text-base md:text-2xl">
          Onicotecnica e lashmaker
        </div>
        <div className='mt-10 flex justify-center text-center items-center'>
        <HoverBorderGradient containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          <span>Check my work</span>
        </HoverBorderGradient>
        </div>
        </div>
        
      </div>
 

    </AuroraBackground>
    <div className='h-full w-full pb-[10px] relative' id='servizi'>
      <h1 className='text-[50px] md:text-[70px] lg:text-[90px] font-semibold opacity-0 text-center justify-center bg-gradient-to-b text-transparent bg-clip-text from-black via-gray-600 to-gray-40' id='servizi'>
        Servizi
      </h1>
    <ExpandableCardDemo />
    </div>
    </NavbarProvider>
    </div>
  )
}

export default Hero