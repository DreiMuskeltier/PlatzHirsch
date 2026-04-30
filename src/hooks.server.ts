// ist ein Middleware — sie läuft bei jedem Request bevor die eigentliche Seite geladen wird.

import type { Handle } from '@sveltejs/kit';
import db from '$lib/db';

export const handle: Handle = async ({ event, resolve }) => { 
    //event = der eingehende Request (Cookies, URL, etc.) , 
    // resolve = führt die eigentliche Seite aus (z.B. +page.server.ts)
    
  const session = event.cookies.get('session'); //Liest den Session-Cookie aus — der enthält entweder eine User-ID oder 'guest'.
//Prüft ob jemand eingeloggt ist und speichert den User in event.locals. 
// locals ist wie ein Rucksack der den gesamten Request begleitet — 
// so kann jede Seite danach auf den eingeloggten User zugreifen ohne nochmal die DB abfragen zu müssen.
  if (!session || session === 'guest') {
    event.locals.user = null;
  } else {
    const user = await db.user.findUnique({ where: { id: session } });
    event.locals.user = user ?? null;
  }

  return resolve(event);
};