import { NextRequest, NextResponse } from 'next/server';
import mysql, { RowDataPacket } from 'mysql2/promise';

// Definizione del tipo per il risultato della query
interface Appointment extends RowDataPacket {
  Subject: string;
  Cognome: string;
  Cellulare: string;
  Servizio: string;
  Esigenze: string;
  AnnoS: number;
  AnnoE: number;
  MeseS: number;
  MeseE: number;
  GiornoS: number;
  GiornoE: number;
  OraS: number;
  OraE: number;
  MinutoS: number;
  MinutoE: number;
  CellulareOld: string;
}

// Funzione per connettersi al database
async function queryDatabase(query: string, params: any[] = []): Promise<Appointment[]> {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  });

  const [rows] = await connection.execute<Appointment[]>(query, params);
  await connection.end();
  return rows;
}

export async function GET(request: NextRequest) {
  try {
    // Query SQL per selezionare i dati dalla tabella
    const result = await queryDatabase('SELECT * FROM Appuntamenti');

    if (result.length === 0) {
      return NextResponse.json({ error: 'Nessun appuntamento trovato' }, { status: 404 });
    }

    


    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Errore durante la richiesta al database' }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  const appuntamento = await request.json();

  const query = `
    INSERT INTO Appuntamenti (Subject, Cognome, Cellulare, Servizio, Esigenze, AnnoS, MeseS, GiornoS, OraS, MinutoS, AnnoE, MeseE, GiornoE, OraE, MinutoE,CellulareOld)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
  `;

  const values = [
    appuntamento.Subject,
    appuntamento.Cognome,
    appuntamento.Cellulare,
    appuntamento.Servizio,
    appuntamento.Esigenze,
    appuntamento.AnnoS,
    appuntamento.MeseS,
    appuntamento.GiornoS,
    appuntamento.OraS,
    appuntamento.MinutoS,
    appuntamento.AnnoE,
    appuntamento.MeseE,
    appuntamento.GiornoE,
    appuntamento.OraE,
    appuntamento.MinutoE,
    appuntamento.Cellulare,
  ];

  try {
    await queryDatabase(query, values);
    return NextResponse.json({ message: 'Appuntamento salvato' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Errore nel salvataggio dell\'appuntamento' }, { status: 500 });
  }
}
export async function PUT(request: NextRequest) {
  try {
    // Estrai i dati inviati dalla richiesta
    const updatedAppuntamento = await request.json();
    console.log('Dati aggiornati ricevuti:', updatedAppuntamento);
    // Esegui la query SQL per aggiornare i dati nel database
    const result = await queryDatabase(
      `UPDATE Appuntamenti
       SET Subject = ?, Cognome = ?, Cellulare = ?, Servizio = ?, Esigenze = ?, AnnoS = ?, MeseS = ?, GiornoS = ?, OraS = ?, MinutoS = ?, AnnoE = ?, MeseE = ?, GiornoE = ?, OraE = ?, MinutoE = ?
       WHERE Cellulare = ${updatedAppuntamento.CellulareOld}`, 
      [
        updatedAppuntamento.Subject,
        updatedAppuntamento.Cognome,
        updatedAppuntamento.Cellulare,
        updatedAppuntamento.Servizio,
        updatedAppuntamento.Esigenze,
        updatedAppuntamento.AnnoS,
        updatedAppuntamento.MeseS,
        updatedAppuntamento.GiornoS,
        updatedAppuntamento.OraS,
        updatedAppuntamento.MinutoS,
        updatedAppuntamento.AnnoE,
        updatedAppuntamento.MeseE,
        updatedAppuntamento.GiornoE,
        updatedAppuntamento.OraE,
        updatedAppuntamento.MinutoE,
        
        
      ]
    );

    return NextResponse.json({ message: 'Appuntamento aggiornato con successo' });
  } catch (error) {
    return NextResponse.json({ error: 'Errore durante l\'aggiornamento dell\'appuntamento' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const Cellulare = await request.json();
    // Verifica se il cellulare è stato fornito
    const result = await queryDatabase(`DELETE FROM Appuntamenti WHERE Cellulare = ${Cellulare.Cellulare}`,[]);


    return NextResponse.json({ message: 'Appuntamento cancellato con successo' });
  } catch (error) {
    console.error('Errore durante la cancellazione dell\'appuntamento:', error);
    return NextResponse.json({ error: 'Errore durante la cancellazione dell\'appuntamento' }, { status: 500 });
  }
}