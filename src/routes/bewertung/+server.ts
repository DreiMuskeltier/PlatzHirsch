import { json } from '@sveltejs/kit';
import { bewertungenRepository } from '$lib/server/repositories/bewertungenRepository';

function getAuth(cookies: any) {
  const session = cookies.get('session');
  if (session && session !== 'guest') return { userId: session, sessionId: undefined };
  return { userId: undefined, sessionId: cookies.get('guestSession') || undefined };
}

export async function POST({ request, cookies }) {
  try {
    const { ortId, sterne } = await request.json();
    if (!ortId || !sterne) return json({ error: 'Daten fehlen' }, { status: 400 });

    const { userId, sessionId } = getAuth(cookies);
    if (!userId && !sessionId) return json({ error: 'Nicht eingeloggt' }, { status: 401 });

    await bewertungenRepository.upsert(ortId, sterne, userId, sessionId);
    return json({ success: true });
  } catch (error) {
    console.error('Bewertung Fehler:', error);
    return json({ error: 'Fehler beim Speichern' }, { status: 500 });
  }
}