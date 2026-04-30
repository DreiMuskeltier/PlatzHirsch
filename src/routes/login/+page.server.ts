import type { Actions } from './$types';
import  db  from '$lib/db';
import bcrypt from 'bcryptjs';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {//enthält alle möglichen POST-Action-Handler für die Seite

  
  login: async ({ request, cookies }) => { //Funktion ist asynchron, weil wir Daten aus der DB lesen und schreiben, request → enthält die eingehenden Form-Daten (request.formData())
                                                //cookies → Zugriff auf Cookies, um Sessions oder Flash-Nachrichten zu setzen 


    //Form-Daten auslesen:
    const formData = await request.formData();
    const email = formData.get('email')?.toString().trim().toLowerCase();
    const password = formData.get('password')?.toString();

    if (!email || !password) return fail(400, { error: 'Alle Felder ausfüllen' });

//Benutzer anhand der Email in der DB suchen:
    const user = await db.user.findUnique({ where: { email } });
    console.log('🔍 User found:', user ? 'JA' : 'NEIN');
    if (!user) return fail(400, { error: 'Email oder Passwort falsch' });

//Passwort prüfen mit bcrypt.compare:
    const valid = await bcrypt.compare(password, user.password);
    console.log('🔑 Passwort korrekt:', valid);
    if (!valid) return fail(400, { error: 'Email oder Passwort falsch' });

    // Speichert die Session im HTTP-Only-Cookie → schützt vor JS-Zugriff (Sicherheit), Dauer: 7 Tage - Später wird diese Session genutzt, um zu prüfen, ob der Benutzer eingeloggt ist
    cookies.set('session', user.id.toString(), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60*60*24*7 // 7 Tage
    });

console.log('🍪 Cookie gesetzt, setze Flash...');
    // Flash-Banner setzen, kurze Nachricht für den Benutzer
    cookies.set('flash', 'Login erfolgreich ', { path: '/profil', maxAge: 5 });

      console.log('✅ Alles OK, redirect zu /profil');

//leitet den Benutzer direkt zum start weiter:
    redirect(303, '/profil'); 
  },

  


  //Form-Daten auslesen
  register: async ({ request, cookies }) => { //Funktion ist asynchron, weil wir Daten aus der DB lesen und schreiben, request → enthält die eingehenden Form-Daten (request.formData())
                                                //cookies → Zugriff auf Cookies, um Sessions oder Flash-Nachrichten zu setzen 
  
    const formData = await request.formData();
    const email = formData.get('email')?.toString().trim().toLowerCase();
    const password = formData.get('password')?.toString();
    const name = formData.get('name')?.toString();
    

    if (!email || !password || !name /*|| !fname || !dbirthStr || !street || !ort || !plz)*/) {
      return fail(400, { error: 'Alle Felder ausfüllen' });
    }

    const existinguser = await db.user.findUnique({ where: { email } });
    if (existinguser) return fail(400, { error: 'Email existiert bereits' });



// folgendes hier unten, weil formData.get() kann null zurückgeben und muss erst validiert werden  in Zeile 66

//10 ist die Salt-Runde → Sicherheitsfaktor
    const hashedPassword = await bcrypt.hash(password, 10);

   




    // Benutzer in DB erstellen:
    const created = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
       
      }
    });

    console.log("Created user:", created);

    cookies.set('flash', 'Registrierung erfolgreich ', { path: '/', maxAge: 5 });
    redirect(303, '/home');

  },
  
  gast: async ({ cookies }) => {
  cookies.set('session', 'guest', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7
  });
  cookies.set('flash', 'Willkommen als Gast!', { path: '/', maxAge: 5 });
  redirect(303, '/Karte');
}
  }
