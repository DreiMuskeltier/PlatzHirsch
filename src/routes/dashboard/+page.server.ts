// src/routes/dashboard/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/db';
import bcrypt from 'bcryptjs';


export const load = async ({ cookies }) => {
   const session = cookies.get('session');
 if (!session) throw redirect(303, '/login?mode=login');

    const kunde = await db.kunde.findUnique({
    where: { id: Number(session) }
  });

  if (!kunde) {
    throw redirect(303, '/login?mode=login');
  }

  return { kunde };
};

  export const actions: Actions = {
  kundenbereich: async ({ request, cookies }) => {

   throw redirect(303, '/kundenbereich');
  }}

 