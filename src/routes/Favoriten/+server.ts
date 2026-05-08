import { json } from '@sveltejs/kit';
import { favoriteRepository } from '$lib/server/repositories/favoriteRepository';
import { randomUUID } from 'crypto';

function getAuth(cookies: any) {
  const session = cookies.get('session');

  // Eingeloggter User: session enthält die userId (nicht 'guest')
  if (session && session !== 'guest') {
    return { userId: session, sessionId: undefined };
  }

  // Gast ('guest' oder nicht eingeloggt): guestSession-Cookie als sessionId
  let sessionId = cookies.get('guestSession') || undefined;
  return { userId: undefined, sessionId };
}

export async function GET({ cookies }) {
  try {
    const { userId, sessionId } = getAuth(cookies);
    if (!userId && !sessionId) return json([]);

    const favoriten = await favoriteRepository.findAll(userId, sessionId);
    return json(favoriten.map(f => f.ort));
  } catch (error) {
    return json({ error: 'Fehler beim Laden' }, { status: 500 });
  }
}

export async function POST({ request, cookies }) {
  try {
    const { ortId } = await request.json();
    if (!ortId) return json({ error: 'ortId fehlt' }, { status: 400 });

    let { userId, sessionId } = getAuth(cookies);

    // Gast ohne guestSession-Cookie → neue sessionId generieren
    if (!userId && !sessionId) {
      sessionId = randomUUID();
      cookies.set('guestSession', sessionId, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365 // 1 Jahr
      });
    }

    const existing = await favoriteRepository.isFavorit(ortId, userId, sessionId);
    if (existing) {
      await favoriteRepository.remove(ortId, userId, sessionId);
      return json({ action: 'removed' });
    } else {
      await favoriteRepository.add(ortId, userId, sessionId);
      return json({ action: 'added' });
    }
  } catch (error) {
    console.error('Favoriten API Fehler:', error);
    return json({ error: 'Fehler beim Speichern' }, { status: 500 });
  }
}