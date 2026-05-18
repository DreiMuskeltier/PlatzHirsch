import { json } from '@sveltejs/kit';
import { ortRepository } from '$lib/server/repositories/ortRepository';
//für Orte in bestimmten kartnebereich anzeigen --> bessere perfomance etc
export async function GET({ url }) {
  const zoom = parseInt(url.searchParams.get('zoom') || '10'); //Liest Query-Parameter aus der URL, 10 defualt weert
  const centerLat = parseFloat(url.searchParams.get('lat') || '53.495'); //wandeln text in zahl um
  const centerLng = parseFloat(url.searchParams.get('lng') || '10.015');

  // Einfacher Offset basierend auf Zoom – größer bei wenig Zoom, kleiner bei viel Zoom
  const offset = 0.5 / Math.pow(2, zoom - 10);

  const orte = await ortRepository.findInBoundingBox({
    minLat: centerLat - offset,
    maxLat: centerLat + offset,
    minLng: centerLng - offset,
    maxLng: centerLng + offset
  });
  return json(orte);
}