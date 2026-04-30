import type { Actions } from './$types';
import { db } from '$lib/db';
import bcrypt from 'bcryptjs';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {//für POST Funktion


login: async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString();

  if (!email || !password) return fail(400, { error: 'Alle Felder ausfüllen' });

  const kunde = await db.kunde.findUnique({ where: { email } });
  if (!kunde) return fail(400, { error: 'Email oder Passwort falsch' });

  const valid = await bcrypt.compare(password, kunde.password);
  if (!valid) return fail(400, { error: 'Email oder Passwort falsch' });

  
  return {
    needsConsent: true,
    userId: kunde.id
  };
},



  //Form-Daten auslesen
register: async ({ request }) => {
  const formData = await request.formData();
    const email = formData.get('email')?.toString().trim().toLowerCase();
    const password = formData.get('password')?.toString();
    const name = formData.get('name')?.toString();
    const fname = formData.get('fname')?.toString();
    const dbirthStr = formData.get('dbirth')?.toString(); // holt den Wert aus dem HTML-Formularfeld, dieser Wert ist immer ein String, toString ist nur sichehrietshalber
    const street = formData.get('street')?.toString();
    const ort = formData.get('ort')?.toString();
    const plz = formData.get('plz')?.toString();
//Hausnummer muss eine Zahl sein
    const hausnummerStr = formData.get('hausnummer')?.toString();
      const acceptPolicy = formData.get('acceptPolicy');
  if (!acceptPolicy) {
    return fail(400, { error: 'Bitte akzeptiere die Datenschutzbestimmungen.' });
  }
    
    if (!hausnummerStr) return fail(400, { error: 'Hausnummer fehlt' });

    const hausnummer = parseInt(hausnummerStr, 10);
    if (isNaN(hausnummer)) return fail(400, { error: 'Hausnummer ungültig' });

    if (!email || !password || !name || !fname || !dbirthStr || !street || !ort || !plz) {
      return fail(400, { error: 'Alle Felder ausfüllen' });
    }

    const existingkunde = await db.kunde.findUnique({ where: { email } });
    if (existingkunde) return fail(400, { error: 'Email existiert bereits' });



// Passwort-Hashing Magie ~


    const hashedPassword = await bcrypt.hash(password, 10);

    //wandelt String in date-objekt um,
    const dbirth = new Date(dbirthStr);




    // Benutzer in DB erstellen:
      const created = await db.kunde.create({
    data: {
      email,
      password: hashedPassword,
      name,
      fname,
      dbirth,
      street,
      hausnummer,
      ort,
      plz
    }
  });

 return {
    needsConsent: true,
    userId: created.id
  };
  }, 
  consent: async ({ request, cookies }) => {
  const formData = await request.formData();
  const userId = formData.get('userId')?.toString();

  if (!userId) return fail(400, { error: "Fehler: userId fehlt" });

  cookies.set('session', userId, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7
  });

  cookies.set('flash', 'Login erfolgreich', {
    path: '/',
    maxAge: 5
  });

  throw redirect(303, "/dashboard");
}
}
