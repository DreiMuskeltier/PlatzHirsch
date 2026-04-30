import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {//load-Funktion sorgt dafür, dass nur eingeloggte Benutzer auf die Seite kommen und ihre eigenen Daten sehen können
  const session = cookies.get('session');//holt sich das Cookie, das den eingeloggten Benutzer identifiziert

  if (!session) {
    // Keine Session → Login
    throw redirect(303, '/login'); 
  }

  const kundeId = parseInt(session);//Mit parseInt wird sichergestellt, dass es eine gültige Zahl ist
  if (isNaN(kundeId)) throw redirect(303, '/login');

  const kunde = await db.kunde.findUnique({ where: { id: kundeId } });//db.kunde.findUnique sucht den Kunden in der Datenbank anhand seiner id

  if (!kunde) throw redirect(303, '/login');

  return { kunde };//Kunden-Daten werden an die Seite zurückgegeben, z.B. für ein Formular, das die Felder vorausfüllt
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const session = cookies.get('session');
    if (!session) return fail(401, { error: 'Nicht eingeloggt' });//Session wird geprüft

    const id = parseInt(session);
    if (isNaN(id)) return fail(401, { error: 'Ungültige Session' });

    const formData = await request.formData();//holt die Daten, die der Benutzer im Formular eingegeben hat, jeder Wert wird aus formData geholt und in eine Variable gespeichert

    const name = formData.get('name')?.toString();
    const fname = formData.get('fname')?.toString();
    const email = formData.get('email')?.toString();
    const street = formData.get('street')?.toString();
    const hausnummer = parseInt(formData.get('hausnummer')?.toString() || '', 10);
    const plz = formData.get('plz')?.toString();
    const ort = formData.get('ort')?.toString();
    //const dbirthStr = formData.get('dbirth')?.toString();
   //const dbirth = new Date(dbirthStr);

    if (!name || !fname || !email || !street || !hausnummer || !plz || !ort) // || !dbirth) //Prüft, ob alle Felder ausgefüllt sind
    {
      return fail(400, { error: 'Alle Felder ausfüllen' });
    }

    await db.kunde.update({//db.kunde.update ändert die Daten des eingeloggten Kunden in der DB.
      where: { id },
      data: { name, fname, email, street, hausnummer, plz, ort} // dbirth }
    });

    return { success: true };//signalisiert der Seite, dass das Update erfolgreich war
  }
};
