import { json } from '@sveltejs/kit';
import { ortRepository } from '$lib/server/repositories/ortRepository';

export async function GET({ url }) {
  // url.searchParams.get('q') liest den Query-Parameter aus der URL
  // z.B. /api/ort/suche?q=Park → q = "Park"
  const q = url.searchParams.get('q') ?? '';

  if (q.length < 2) {
    // Erst ab 2 Zeichen suchen, sonst zu viele Ergebnisse
    return json([]);
  }

  const ergebnisse = await ortRepository.searchByName(q);
  return json(ergebnisse);
}