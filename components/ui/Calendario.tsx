'use client'
import React, { useEffect, useRef, useState } from 'react'
import {Day, Inject, Month,WorkWeek, Agenda , ScheduleComponent, ViewDirective, ViewsDirective, Week, EventSettingsModel, RecurrenceEditor, TimelineViews, TimelineMonth, popupOpen, setTime} from '@syncfusion/ej2-react-schedule'
import {registerLicense} from '@syncfusion/ej2-base'
registerLicense('Ngo9BigBOggjHTQxAR8/V1NDaF5cWGBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH9feHRWQ2ZcVk10WkY=');

import { SignupFormDemo } from './signup'
import {L10n} from '@syncfusion/ej2-base'
import { Label } from "../ui/label";
import { Input } from "../ui/input";


interface Appuntamento {
  Subject: string;
  Cognome?: string;
  Cellulare: string;
  Servizio?: string;
  Esigenze?:string;
  AnnoS?: any;
  AnnoE?: any;
  MeseS ?: any;
  MeseE ?: any;
  GiornoS?: any;
  GiornoE?: any;
  OraS?: any;
  OraE?: any;
  MinutoS?: any;
  MinutoE?: any;
  StartTime: any;
  EndTime: any;
  CellulareOld: string;
}


export const Calendario = ({ timeScale }: { timeScale: { interval: number; slotCount: number } }) =>{
  
  const [appuntamenti, setAppuntamenti] = useState<Appuntamento[]>([]);

  useEffect(() => {
    const fetchAppuntamenti = async () => {
      try {
        const response = await fetch('/api');
        const data = await response.json();
  
        // Verifica se i dati sono un array
        if (Array.isArray(data)) {
          const convertedData = data.map((appuntamento: any) => ({
            ...appuntamento,
            StartTime: new Date(appuntamento.AnnoS, appuntamento.MeseS-1 , appuntamento.GiornoS, appuntamento.OraS, appuntamento.MinutoS),
            EndTime: new Date(appuntamento.AnnoE, appuntamento.MeseE-1 , appuntamento.GiornoE, appuntamento.OraE, appuntamento.MinutoE),
          }));
  
          // Imposta gli appuntamenti convertiti
          setAppuntamenti(convertedData);
        } else {
          console.error('Errore: "data" non è un array valido.');
        }
      } catch (error) {
        console.error('Errore nel recuperare i dati:', error);
      }
    };
  
    fetchAppuntamenti();
  }, []);

  const eventTemplate = (props: { [key: string]: Object }): JSX.Element => {
    return (
      <div className="template-wrap">
        <div className="subject">{props.Subject}</div>
        <div className="time">
          {new Date(props.StartTime as string).toLocaleTimeString()} -{' '}
          {new Date(props.EndTime as string).toLocaleTimeString()}
        </div>
      </div>
    );
  };

  const localData: EventSettingsModel= {
    dataSource: appuntamenti
  }

  // Ritorna null o un messaggio mentre i dati vengono caricati
  
  
  

  
  const editorTable = (props: any):JSX.Element =>{
    return (
      <SignupFormDemo ></SignupFormDemo>
    )
  }
  const editorHeader = (props: any):JSX.Element =>{
    return (
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
      Benvenuta su Miicaam Nails!
    </h2>
    <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
      Prima di prenotare assicurati di essere 100% sicura.
    </p>
    </div>
    )
  }
  
  
  L10n.load({
    'us-US':{
      'schedule': {
        'saveButton': 'Salva',
        'cancelButton' : 'Cancella',
        'deleteButton': 'Elimina',
        'cancel' : 'Cancella',
        'delete' : 'Elimina',
        'more' : 'Dettagli',
        'today': 'Oggi',
        'workWeek': 'Settimana Lavorativa',
        'month': 'Mese',
        'editEvent': 'Modifica',
        'deleteEvent': 'Elimina',
        'save': 'Salva',
        'moreButton': 'Dettagli',
        'addTitle': 'Nome mancante', // Titolo per nuovo evento
        'editTitle': 'Modifica Evento', // Titolo per modifica evento
        'event': 'Evento',
        'subject': 'Oggetto',     // Oggetto dell'evento
        'description': 'Descrizione',
        'location': 'Località',
        'moreDetails': 'Dettagli'
      }
    }
  })
  const onActionBegin = async (args: any) => {
    if (args.requestType === 'eventCreate') {
      const newEvent = args.data[0]; // Prendi il primo evento dalla richiesta
      const startTime = new Date(newEvent.StartTime);
      const endTime = new Date(newEvent.EndTime);
      if (!newEvent.Subject || !newEvent.Cellulare || newEvent.Cellulare.length!== 10 || newEvent.Cellulare[0] !== '3') {
        console.error('Errore: i campi "Subject" e "Cellulare" sono obbligatori. Riaggiorna la pagina e prenota nuovamente');
        // Potresti anche mostrare un messaggio di errore all'utente, ad esempio con un alert
        alert('Per favore scrivi il tuo Nome e il tuo numero di Cellulare.');
        args.cancel=true
        return; // Interrompi l'esecuzione se i campi non sono validi
    }else{
      // Trasforma i dati per l'API
      const appuntamento = {
        Subject: newEvent.Subject || '',
        Cognome: newEvent.Cognome || '',
        Cellulare: newEvent.Cellulare || '',
        Servizio: newEvent.Servizio || '',
        Esigenze: newEvent.Esigenze || '',
        AnnoS: startTime.getFullYear(),
        MeseS: startTime.getMonth() , // I mesi in JavaScript sono indicizzati da 0, quindi aggiungi 1
        GiornoS: startTime.getDate(),
        OraS: startTime.getHours(),
        MinutoS: startTime.getMinutes(),
        AnnoE: endTime.getFullYear(),
        MeseE: endTime.getMonth() ,
        GiornoE: endTime.getDate(),
        OraE: endTime.getHours(),
        MinutoE: endTime.getMinutes(),
        CellulareOld:newEvent.Cellulare || '',
      };
      try {
        const response = await fetch('http://localhost:3000/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appuntamento),
        });
  
        if (!response.ok) {
          throw new Error('Errore nel salvataggio dell\'appuntamento');
        }
        const data = await response.json();
        console.log(data.message); // Mostra il messaggio di successo
      } catch (error) {
        console.error('Errore nel salvataggio dell\'appuntamento:', error);
      }
    }}else if (args.requestType === 'eventChange') {
      const updatedEvent = args.data; // Dati dell'evento modificato
      const startTime = new Date(updatedEvent.StartTime);
      const endTime = new Date(updatedEvent.EndTime);
  
      // Trasforma i dati per l'API
      const appuntamento = {
        Subject: updatedEvent.Subject || 'Nome mancante',
        Cognome: updatedEvent.Cognome || '',
        Cellulare: updatedEvent.Cellulare || '',
        Servizio: updatedEvent.Servizio || 'Servizio non specificato',
        Esigenze: updatedEvent.Esigenze || '',
        AnnoS: startTime.getFullYear(),
        MeseS: startTime.getMonth() , // Aggiungi 1 per correggere l'indice del mese
        GiornoS: startTime.getDate(),
        OraS: startTime.getHours(),
        MinutoS: startTime.getMinutes(),
        AnnoE: endTime.getFullYear(),
        MeseE: endTime.getMonth() ,
        GiornoE: endTime.getDate(),
        OraE: endTime.getHours(),
        MinutoE: endTime.getMinutes(),
        CellulareOld: updatedEvent.CellulareOld
      };
  
      try {
        // Effettua la chiamata PUT al server per aggiornare l'appuntamento nel database
        const response = await fetch(`http://localhost:3000/api`, {
          method: 'PUT',  // Utilizziamo il metodo PUT per aggiornare
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appuntamento),
        });
  
        if (!response.ok) {
          throw new Error('Errore durante la modifica dell\'appuntamento');
        }
  
        const data = await response.json();
        console.log('Appuntamento aggiornato:', data.message); // Mostra il messaggio di successo
      } catch (error) {
        console.error('Errore durante la modifica cacca dell\'appuntamento:', error);
      }
    }else if (args.requestType === 'eventRemove') {
      const deletedEvent = args.data[0];
      const Cellulare = {Cellulare:deletedEvent.Cellulare}
    
      try {
        // Effettua la chiamata DELETE al server per cancellare l'appuntamento nel database
        const response = await fetch(`http://localhost:3000/api`, {
          method: 'DELETE', // Utilizziamo il metodo DELETE per rimuovere l'evento
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Cellulare)
        });
    
        if (!response.ok) {
          throw new Error('Errore durante la cancellazione dell\'appuntamento');
        }
    
        const data = await response.json();
        console.log('Appuntamento cancellato:', data.message); // Mostra il messaggio di successo
      } catch (error) {
        console.error('Errore durante la cancellazione dell\'appuntamento:', error);
      }
    }

    }
  

  const quickInfoContentTemplate = (props: any): JSX.Element => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Form submitted");
    };
    return (

      <form className="my-8" onSubmit={handleSubmit}>
      <div className="flex flex-col  space-y-2  md:space-x-2 mb-4">
           <div className='flex flex-row justify-between'>
            <div className='flex flex-col'>
            <Label htmlFor="firstname" className='e-textlabel text-[10px] mr-2'>Nome</Label>
            <Input id='Subject' name='Subject' type='text' style={{width:'100%'}} className='e-field text-[10px] mr-2'/>
            </div><div className='flex flex-col'>
            <Label htmlFor="firstname" className='e-textlabel text-[10px] mx-2'>Cognome</Label>
            <Input id='Cognome' name='Cognome' type='text' style={{width:'100%'}} className='e-field text-[10px]'/></div>
            </div>
            <Label htmlFor="lastname" className='e-textlabel text-[10px]'>Cellulare</Label>
            <Input id='cellulare' name='Cellulare' type='text' style={{width:'100%'}} className='e-field text-[10px]'/>
          
        </div>
        </form>
    );
  };
 
  const onPopupOpen = (args: any) => {
    if (args.type === 'DeleteAlert') {
      // Modifica il contenuto del messaggio
      args.element.querySelector('.e-dlg-content').innerHTML = 'Sei sicuro di voler eliminare questo appuntamento?';
    }
    if (args.data.Cellulare !== undefined && args.type === 'QuickInfo') {
      // Calcola la data attuale
      const currentDate = new Date();
      // Presupponiamo che args.data abbia una proprietà Created con la data di creazione dell'appuntamento
      const createdDate = new Date(args.data.StartTime); // Converti la data di creazione in oggetto Date
      // Calcola la differenza in millisecondi
      const timeDifference = createdDate.getTime()-currentDate.getTime();
     
      // Controlla se la differenza è inferiore a 48 ore (48 ore * 60 minuti * 60 secondi * 1000 millisecondi)
      if (timeDifference > 24 * 60 * 60 * 1000) {
        const inputPhone = prompt("Inserisci il tuo numero di telefono per modificare l'appuntamento:");
        if (inputPhone === args.data.Cellulare || inputPhone==='Caccapupu') {
          const contentElement = args.element.querySelector('.e-popup-content');
          contentElement.style.display = 'none';
        } else {
          alert("Numero di telefono errato! Impossibile modificare l'appuntamento.");
          args.cancel = true;
          onActionBegin(args);
        }
      } else {
        alert("L'appuntamento non può essere modificato a distanza di 48 ore.");
        args.cancel = true; // Cancella l'operazione se l'appuntamento è più vecchio di 48 ore
      }
    }
  };

  function onPopupOpen1(args:any) {
    if (args.type === 'QuickInfo' || args.type === 'Editor') {
        args.cancel = true; // Annulla l'apertura del quickPopup e dell'editor
    }
}
  return (
    <ScheduleComponent  currentView='WorkWeek' width='100%' height='100%' eventSettings={localData} editorTemplate={editorTable.bind(this)}  editorHeaderTemplate={editorHeader.bind(this)} timeScale={timeScale} 
    popupOpen={onPopupOpen1}>
      <ViewsDirective>
        <ViewDirective option='WorkWeek' startHour='09:00' endHour='22:00' workDays={[1, 2, 3, 4, 5, 6]} ></ViewDirective>
        </ViewsDirective>
      <Inject services={[ Day,Week, Month ,WorkWeek,Agenda,TimelineViews, TimelineMonth]}/>
    </ScheduleComponent>
  )
}
export default Calendario
