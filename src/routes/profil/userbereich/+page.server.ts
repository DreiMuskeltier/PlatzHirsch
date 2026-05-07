// src/routes/profil/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import  db  from '$lib/db';
import bcrypt from 'bcryptjs';


export const load = async ({ cookies }) => {
   const session = cookies.get('session'); 
  console.log('Session:', session);
 if (!session) throw redirect(303, '/login?mode=login');

    const user = await db.user.findUnique({
    where: { id: session } ,
    select: {        // ← nur plain Felder auswählen
      id: true,
      name: true,
      email: true,
    }})
    

  console.log('User:', user);



  if (!user) {
    throw redirect(303, '/login?mode=login');
  }

  // Flash-Cookie auslesen und löschen
  const flash = cookies.get('flash');
  cookies.delete('flash', { path: '/' });




  return { user };

};

export const actions: Actions = {
  logout: async ({ cookies }) => {
    cookies.delete('session', { path: '/' });
    throw redirect(303, '/login?mode=login');
  }
};



 