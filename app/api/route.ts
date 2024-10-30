import { NextRequest, NextResponse } from 'next/server';
import mysql, { RowDataPacket } from 'mysql2/promise';

// Definizione del tipo per il risultato della query
interface Appointment extends RowDataPacket {
  Subject: string;
  Cognome: string;
  Cellulare: string;
  Servizio: string;
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
    const result = await queryDatabase('SELECT * FROM Appuntamento');

    if (result.length === 0) {
      return NextResponse.json({ error: 'Nessun appuntamento trovato' }, { status: 404 });
    }

    


    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Errore durante la richiesta al database' }, { status: 500 });
  }
}
