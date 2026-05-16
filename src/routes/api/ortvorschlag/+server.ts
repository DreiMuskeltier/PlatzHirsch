import { json } from '@sveltejs/kit';
import { OrtVorschlagService } from '$lib/server/ortVorschlag/ortVorschlag.service';

export async function POST({ request, cookies }) {
  try {
    const session = cookies.get('session');

    // Gast oder nicht eingeloggt → 401
    if (!session || session === 'guest') {
      return json({ error: 'Nicht eingeloggt' }, { status: 401 });
    }

    const body = await request.json();

    if (!body.name || body.lat === undefined || body.lng === undefined) {
      return json({ error: 'Fehlende Pflichtfelder' }, { status: 400 });
    }

    const result = await OrtVorschlagService.create({
      name: body.name,
      beschreibung: body.beschreibung,
      lat: body.lat,
      lng: body.lng,
      userId: session  // kommt jetzt aus dem Cookie
    });

    return json(result, { status: 201 });
  } catch (error) {
    console.error('API ERROR:', error);
    return json({ error: 'Fehler beim Erstellen des Ortsvorschlags' }, { status: 500 });
  }
}
