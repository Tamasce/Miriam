"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import { useNavbarContext } from "./ui/NavbarContext";

export function NavbarDemo() {
  const {isVisible} = useNavbarContext();
  if(!isVisible) return null;
  return (
    
    <div className="w-full flex items-center justify-center">
      <Navbar className="top-2 flex justify-center" />
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
        <MenuItem setActive={setActive} active={active} item="Contatti" href="#contatti">
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
