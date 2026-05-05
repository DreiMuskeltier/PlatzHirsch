import { json } from '@sveltejs/kit';
import { OrtVorschlagService } from '$lib/server/ortVorschlag/ortVorschlag.service';

export async function POST({ request }) {
  try {
    const body = await request.json();


  if (
  !body.name ||
  body.lat === undefined ||
  body.lng === undefined ||
  !body.userId
) {
  return json(
    { error: 'Fehlende Pflichtfelder' },
    { status: 400 }
  );
}
    const result = await OrtVorschlagService.create({
      name: body.name,
      beschreibung: body.beschreibung,
      lat: body.lat,
      lng: body.lng,
      userId: body.userId
    });

    return json(result, { status: 201 });

  } catch (error) {
    console.error("API ERROR:", error);
    return json(
      { error: 'Fehler beim Erstellen des Ortsvorschlags' },
      { status: 500 }
    );
  }
}