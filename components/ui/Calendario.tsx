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


  const localData: EventSettingsModel= {
    dataSource: appuntamenti
  }

  // Ritorna null o un messaggio mentre i dati vengono caricati
  
  
  

  
 

  
  
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
 
   function onPopupOpen1(args:any) {
    if (args.type === 'QuickInfo' || args.type === 'Editor') {
        args.cancel = true; // Annulla l'apertura del quickPopup e dell'editor
    }
}
  return (
    <ScheduleComponent  currentView='WorkWeek' width='100%' height='100%' eventSettings={localData} timeScale={timeScale} 
    popupOpen={onPopupOpen1}>
      <ViewsDirective>
        <ViewDirective option='WorkWeek' startHour='09:00' endHour='22:00' workDays={[1, 2, 3, 4, 5, 6]} ></ViewDirective>
        </ViewsDirective>
      <Inject services={[ Day,Week, Month ,WorkWeek,Agenda,TimelineViews, TimelineMonth]}/>
    </ScheduleComponent>
  )
}
export default Calendario
