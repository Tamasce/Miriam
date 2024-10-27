import Certificazioni from "@/components/certificazioni";
import Contatti from "@/components/Contatti";
import Formazione from "@/components/Formazione";
import Hero from "@/components/Hero";
import Lavori from "@/components/Lavori";
import Prenotazione from "@/components/Prenotazione";





export default function Home() {
  return (
    <main className=" flex justify-center items-center flex-col mx-auto overflow-clip bg-neutral-50"> 
      <div className="max-w-[2500px] w-full">
        <Hero />
        <Lavori />
        <Certificazioni />
        <Prenotazione />
        <Contatti />
      </div>
    </main>
  );
}
