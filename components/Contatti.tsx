'use client'
import React from 'react'
import { BackgroundLines } from './ui/lines'
import MagicButton from './ui/magic'
import { FaLocationArrow } from 'react-icons/fa'
import { useGSAP } from '@gsap/react'
import { animateWithGsap } from '@/data/aniamtion'
import { socialMedia } from '@/data'

const Contatti = () => {
  useGSAP(()=>{
    animateWithGsap('#contatti1', {y:0, opacity:1, duration: 2})
    animateWithGsap('#contatti2', {y:0, opacity:1, duration: 2, delay: 1, ease: 'power2'})
  },[])
  return (
   <BackgroundLines className=" relative flex items-center justify-center w-full flex-col h-screen">
      <div className="flex flex-col items-center">
        <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight text-[40px] md:text-[50px] lg:text-[60px] opacity-0" id='contatti1'>
        Pronta a valorizzare la tua bellezza?
        </h1>
        <p className="w-[300px] mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center opacity-0" id='contatti2'>
        Consulta il calendario per scegliere giorno e ora che preferisci, poi contattami per fissare l'appuntamento.
        </p>
        <a href='tel:+393273097541'>
        <MagicButton title="Chiama Ora!" icon={<FaLocationArrow />} position="right"/>
        </a>
        </div>
        <div className="w-[90vw] md: flex mt-16 md:flex-row flex-col justify-between items-center absolute bottom-10">
      <p className="text-sm md:font-normal font-light text-neutral-700">
        Copyright © 2024 Miriam Stancampiano
        </p>
        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((profile) => (
            <a
              key={profile.id}
              href={profile.url}  // Assumi che "profile.href" contenga il link
              target="_blank"      // Apre il link in una nuova scheda
              rel="noopener noreferrer"
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-neutral-100 rounded-lg border border-neutral-200"
            >
              <img src={profile.img} key={profile.id} width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
      
   </BackgroundLines>
  )
}

export default Contatti