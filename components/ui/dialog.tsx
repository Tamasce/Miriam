
"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/data/useOutsideClick";
import { useNavbarContext } from "./NavbarContext";

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
  const [isSmall, setIsSmall] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const { setIsVisible } = useNavbarContext(); // Ottieni la funzione per nascondere la navbar
  
  useEffect(() => {
    // Esegui solo lato client
    const handleResize = () => {
      setIsSmall(window.innerWidth < 768);
    };

    // Chiama la funzione al caricamento del componente e al resize
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
        setIsVisible(true); // Mostra la navbar quando viene chiuso il dettaglio
      }
    }
    
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
      window.scrollTo({
        top: window.innerHeight, // Scroll di 100vh
        behavior: "smooth", // Scroll con animazione fluida
      }); // Scorri fino all'inizio dello schermo
      setIsVisible(false); // Nascondi la navbar quando viene aperta una card
    } else {
      document.body.style.overflow = "auto";
      setIsVisible(true); // Mostra la navbar quando non c'è nessuna card attiva
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, setIsVisible]);

  useOutsideClick(ref, () => {
    setActive(null);
    setIsVisible(true); // Mostra la navbar quando si clicca fuori
  });

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className={`fixed  grid  z-[100] overflow-hidden ${isSmall ? "place-items-center inset-0" : "top-0 left-1/2 transform -translate-x-1/2"  }`}>
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2  items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => {
                setActive(null);
                setIsVisible(true); // Mostra la navbar al clic del pulsante chiudi
              }}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:w-[500px] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={1000}
                  height={1000}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-80  pb-10 flex flex-col items-center gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      
      <ul className="lg:max-w-[1000px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => {
              setActive(card);
              setIsVisible(false); // Nascondi la navbar al clic su una card
            }}
            className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-full cursor-pointer"
          >
            <div className="flex gap-4 flex-col rounded-xl w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={1000}
                  height={1000}
                  src={card.src}
                  alt={card.title}
                  className="h-[450px] rounded-xl object-cover "
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};


const cards = [
  {
    description: "Onicotecnica",
    title: "Ricostruzione & Semipermanente",
    src: "/ricostruzione.jpg",
    content: () => {
      return (
        <div>
  <ul className="custom-bullet-list">
    <li className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
      <span className="text-neutral-800 dark:text-neutral-200">Ricostruzione</span> 25€ (superando la lunghezza 5 il prezzo varierà);
    </li>
    <li className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
      <span className="text-neutral-800 dark:text-neutral-200">Refill</span> 20€;
    </li>
    <li className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
      <span className="text-neutral-800 dark:text-neutral-200">Ricostruzione unghie onicofagiche</span> 30€;
    </li>
    <li className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
      <span className="text-neutral-800 dark:text-neutral-200">Copertura in gel</span> 20€;
    </li>
    
    <li className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
          <span className=" text-neutral-800 dark:text-neutral-200">
            Semipermanente
          </span>{" "}
          15€;
        </li>
        <li className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
          <span className=" text-neutral-800 dark:text-neutral-200">
            Babyboomer
          </span>{" "}
          28€;
        </li>
        <li className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
      <span className="text-neutral-800 dark:text-neutral-200">Decorazioni 3D</span> 1€;
    </li>
    <li className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
      <span className="text-neutral-800 dark:text-neutral-200">Strass grandi</span> 0.50€;
    </li>
    <li className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
          <span className=" text-neutral-800 dark:text-neutral-200">
            Pedicure
          </span>{" "}
          18€;
        </li>
        <li className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
          <span className=" text-neutral-800 dark:text-neutral-200">
            French Muretto
          </span>{" "}
          (il prezzo varia);
        </li>
  </ul>
 
</div>

            
      );
    },
  },
  {
    description: "Lashmaker",
    title: "Extension & Laminazione",
    src: "/extension.png",
    content: () => {
      return (
        <div className="w-full">
          <ul>
            <li className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
              <span className=" text-neutral-800 dark:text-neutral-200">
                Extension ciglia one to one
              </span>{" "}
              40€
            </li>
            <li className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
              <span className=" text-neutral-800 dark:text-neutral-200">
              Extension ciglia volume soft
              </span>{" "}
              45€;
            </li>
            <li className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
              <span className=" text-neutral-800 dark:text-neutral-200">
              Extension ciglia volume
              </span>{" "}
              50€;
            </li>
            <li className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
              <span className=" text-neutral-800 dark:text-neutral-200">
              Extension ciglia mega volume
              </span>{" "}
              55/60€;
            </li>
            <li className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
              <span className=" text-neutral-800 dark:text-neutral-200">
              Refill extension
              </span>{" "}
              meno 10€ dal prezzo;
            </li>
            <li className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
              <span className=" text-neutral-800 dark:text-neutral-200">
              Laminazione Ciglia
              </span>{" "}
              25€;
            </li>
            <li className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
              <span className=" text-neutral-800 dark:text-neutral-200">
              Rimozione extension
              </span>{" "}
              5€;
            </li>
            <li className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
              <span className=" text-neutral-800 dark:text-neutral-200">
              Baffetto e Sopracciglia
              </span>{" "}
              5€;
            </li>
            </ul>
            </div>
      );
    },
  }
  
];
