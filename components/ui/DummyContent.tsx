
const DummyContent1 = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content"+index}
            >
            <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-8 rounded-3xl mb-4" id="ricostruzione">
            <p className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Ricostruzione
              </span>{" "}
              25€ {"(superando la lunghezza 5 il presso varierà);"}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Refill
              </span>{" "}
              20€;
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Ricostruzione unghie onicofagiche
              </span>{" "}
              30€;
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Copertura in gel
              </span>{" "}
              20€;
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Decorazioni 3D
              </span>{" "}
              1€;
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Strass grandi
              </span>{" "}
              0.50€;
            </p>
            </div>
            <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-7 rounded-3xl mb-4">
              <p className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
                La riparazione è gratuita fino a 7 giorni dalla ricostruzione, dopo di che il prezzo è 3€.
              </p>
            </div>
            
          </div>
        );
      })}
    </>
  );
};
const DummyContent2 = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_) => {
        return (
          <div
            key={"dummy-content2"}
          >
            <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4" id="extension">
            <p className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Extension ciglia one to one
              </span>{" "}
              40€
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Extension ciglia volume soft
              </span>{" "}
              45€;
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Extension ciglia volume
              </span>{" "}
              50€;
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Extension ciglia mega volume
              </span>{" "}
              55/60€;
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Refill extension
              </span>{" "}
              meno 10€ dal prezzo;
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-base font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Rimozione extension
              </span>{" "}
              5€;
            </p>
            </div>
            
            
          </div>
        );
      })}
    </>
  );
};
const DummyContent3 = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_) => {
        return (
          <div
            key={"dummy-content3"}
          >
            <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4" id="semipermanente">
            <p className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Semipermanente
              </span>{" "}
              15€
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Babyboomer
              </span>{" "}
              28€
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Pedicure
              </span>{" "}
              18€
            </p>
            </div>
            
            
          </div>
        );
      })}
    </>
  );
};
const DummyContent4 = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_) => {
        return (
          <div
            key={"dummy-content4"}
          >
            <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4" id="laminazione">
            <p className="text-neutral-600 dark:text-neutral-400 text-base  font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Laminazione ciglia
              </span>{" "}
              25€
            </p>
            
            </div>
            
            
          </div>
        );
      })}
    </>
  );
};

export const data = [{
  category: 'Onicotecnica',
  title:'Ricostruzione & Interventi correttivi',
  src: '/ricostruzione.png',
  content : <DummyContent1 />,
  id:'1'
},
{
  category: "Lashmaker",
  title: "Extension",
  src: "/extension.png",
  content: <DummyContent2 />,
  id:'2'
},
{
  category: "Onicotecnica",
  title: "Trattamenti estetici e leggeri",
  src: "/servizi2.jpeg",
  content: <DummyContent3 />,
  id:'3'
},
{
  category: "Lashmaker",
  title: "Laminazione",
  src: "/servizi3.jpg",
  content: <DummyContent4 />,
  id: '4'
},]
