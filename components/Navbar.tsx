"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import { useNavbarContext } from "./ui/NavbarContext";
import {HamburgerMenu} from '../components/design/header'
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import MenuSvg from "./design/MenuSvg";
import { HoverBorderGradient } from "./ui/button";
import { navigation } from "@/data";
import { AuroraBackground } from "./ui/aurora-background";

export function NavbarDemo() {
  const {isVisible} = useNavbarContext();
  const [openNavigation, setOpenNavigation]=useState(false) 
  if(!isVisible) return null; 
  const toggleNavigation = () => {
    if(openNavigation){
      setOpenNavigation(false);
      enablePageScroll();
    }else{
      setOpenNavigation(true);
      disablePageScroll();
    }
  }
  const handleClick = ()=>{
    if(!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  }
  return (
    
    <div className={`w-full items-center justify-center   flex}`}>
     <Navbar className={`top-2 md:flex justify-center hidden`} /> 
     <div className={`${openNavigation ? 'flex' : 'hidden'}  `} style={{zIndex: 1000}}>
      <nav className={`fixed top-0 left-0 right-0 bottom-0 z-50`}>
      <AuroraBackground>
        <div className="relative z-50 flex flex-col items-center justify-center m-auto h-screen">
          
        {navigation.map((item)=>(
              <a onClick={handleClick} key={item.id} href={item.url} className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 md:hidden px-6 py-6`}>
                {item.title}
              </a>
            )
            )}
           
        </div>
        </AuroraBackground>
      </nav>
     </div>
      <HoverBorderGradient containerClassName="rounded-full top-2 right-2 fixed z-50"
        as="button"
        className="bg-white text-black dark:text-white flex items-center space-x-2 md:hidden"
         onClick={toggleNavigation}>
        <MenuSvg openNavigation={openNavigation}/>
      </HoverBorderGradient>
      
    </div>
  );
}



export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
      <MenuItem setActive={setActive} active={active} item="Servizi" id="1" href='#servizi'>
          <div className="text-sm grid md:grid-cols-2 grid:cols-1 md:gap-10 md:p-4 gap-5 p-2">
            <ProductItem
              title="Ricostruzione & Semipermanente"
              href="#servizi"
              src="/navbar.jpg"
              description="Unghie perfette, stile impeccabile."
              
            />
            <ProductItem
              title="Extension & Laminazione"
              href="#servizi"
              src="/laminazione.jpg"
              description="Per uno sguardo intenso e naturale."
            />
            
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Lavori" href="#lavori">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="#lavori">
              <img src="/sfondo.jpg" width={200}/>
            </HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={null} item="Certificazioni" href="#certificazioni">
        </MenuItem>
        <MenuItem setActive={setActive} active={null} item="Calendario" href="#prenotazioni">
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Contatti" id="2" href="#contatti">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="https://www.instagram.com/miicaam_nails/">Instagram</HoveredLink>
            <HoveredLink href="https://www.facebook.com/miicaam.nail?locale=it_IT">Facebook</HoveredLink>
            <HoveredLink href="https://www.linkedin.com/in/miriam-stancampiano-aab970330/">Linkedin</HoveredLink>
            <HoveredLink href="tel:+393273097541">Cellulare</HoveredLink>
            
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
