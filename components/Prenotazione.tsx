'use client'
import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import { animateWithGsap } from '@/data/aniamtion'
import { BackgroundGradient } from './ui/gradient'
import Calendario1 from './ui/Calendario2'
import Calendario from './ui/Calendario'






const Prenotazione = () => {
  const [timeScale, setTimeScale] = useState({ interval: 30, slotCount: 1 });
  const handleServiceChange = (e: any) => {
    const service = e.value; 
    let newTimeScale = { interval: 60, slotCount: 1 }; // Default value

    // Assegna la durata in base al servizio selezionato
    if (service === 'Extension') {
      newTimeScale = { interval: 120, slotCount: 1 };
    } else if (service === 'Laminazione') {
      newTimeScale = { interval: 60, slotCount: 1 };
    } else if (service === 'Ricostruzione') {
      newTimeScale = { interval: 60, slotCount: 1 };
    } else if (service === 'Semipermanente') {
      newTimeScale = { interval: 60, slotCount: 1 };
    } else if (service === 'Smontaggio/Sopracciglia/Baffetto') {
      newTimeScale = { interval: 15, slotCount: 1 };
    } else {
      console.error("Servizio selezionato non valido");
      return;
    }

    setTimeScale(newTimeScale); // Imposta il nuovo timeScale
  };
  useGSAP(()=>{
    animateWithGsap('#prenotazioni1', {y:0, opacity:1, duration: 2})
    animateWithGsap('#prenotazioni2', {y:0, opacity:1, duration: 2, delay: 1, ease: 'power2'})
  },[])
  return (
    <div className='w-full h-full bg-neutral-100 pb-10'>
    <div className="w-[80vw] mx-auto rounded-md  h-full overflow-hidden bg-neutral-100 flex flex-col items-center justify-center" id='prenotazioni'>
       <div className='text-[50px] md:text-[70px] lg:text-[90px] font-semibold opacity-0 flex text-center justify-center bg-gradient-to-b text-transparent bg-clip-text from-black via-gray-600 to-gray-40' id='prenotazioni1'>
              Calendario
        </div>
          <div className='flex flex-col items-center justify-center opacity-0 pb-10' id='prenotazioni2'>
            <p className='font-normal '>
            Verifica la disponibilità sul calendario✦
            </p>
            
            
            
          </div>{/*
          <div className='mb-20 flex flex-col w-full relative'>
            <div className='absolute bottom-[3px] border right-0 left-0 border-blue-500 z-100'></div>
          <Label htmlFor="email" className='e-textlabel'>Servizio</Label>
          <DropDownListComponent id='servizio' dataSource={['Extension', 'Laminazione','Ricostruzione', 'Semipermanente','Smontaggio/Sopracciglia/Baffetto']} placeholder='Clicca qui per scegliere il servizio' data-name='Servizio' className='e-field e-dropdownlist' value={null} change={handleServiceChange}
           >
            </DropDownListComponent>
            </div>*/}
            <div className='flex flex-col justify-center items-center h-full'>
          <BackgroundGradient className='h-full bg-white rounded-[10px]' containerClassName='w-full h-full mb-10'>
          <Calendario timeScale={timeScale} />
          </BackgroundGradient>
          </div>
          <div>
          
          </div>
          
    </div>
    </div>
     )
}

export default Prenotazione