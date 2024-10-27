import { useEffect, useState } from 'react';
import { useTransform, useViewportScroll } from 'framer-motion';

function MyComponent() {
  const { scrollYProgress } = useViewportScroll();
  const [translateThird, setTranslateThird] = useState(useTransform(scrollYProgress, [0, 1], [0, 0]));

  useEffect(() => {
    // Funzione per aggiornare translateThird in base alle dimensioni dello schermo
    function updateTranslateThird() {
      const mediaQuerySmall = window.matchMedia('(max-width: 767px)');
      
      if (mediaQuerySmall.matches) {
        // Se siamo in un dispositivo small o extra small
        setTranslateThird(useTransform(scrollYProgress, [0, 1], [0, 200]));
      } else {
        // Se siamo in un dispositivo più grande
        setTranslateThird(useTransform(scrollYProgress, [0, 1], [0, -200]));
      }
    }

    // Esegui la funzione inizialmente
    updateTranslateThird();

    // Aggiungi un listener per aggiornare le dimensioni della finestra
    window.addEventListener('resize', updateTranslateThird);

    // Cleanup: rimuovi il listener quando il componente viene smontato
    return () => {
      window.removeEventListener('resize', updateTranslateThird);
    };
  }, [scrollYProgress]);

  return (
    <div style={{ transform: `translateY(${translateThird})` }}>
      {/* Contenuto del componente */}
    </div>
  );
}

export default MyComponent;
