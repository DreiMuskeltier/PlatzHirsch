import { json } from '@sveltejs/kit';
import { db } from '$lib/db';
import type { RequestEvent } from '@sveltejs/kit';

const logoMap: Record<"Logo A" | "Logo B" | "Kein Logo", number> = {
  "Logo A": 1,
  "Logo B": 2,
  "Kein Logo": 3
};

// POST Funktion
export async function POST(event: RequestEvent) { 
  const { request, cookies } = event;

  // KUNDEN-ID aus Cookies holen
  const session = cookies.get('session'); 
  if (!session) {
    return json({ error: 'Nicht eingeloggt' }, { status: 401 });
  }

  const kundenId = parseInt(session);
  if (isNaN(kundenId)) {// ist das gültige Zahl?
    return json({ error: 'Ungültige Session' }, { status: 401 });
  }

  const kunde = await db.kunde.findUnique({ where: { id: kundenId } });//prüft ob Kunde existiert
  if (!kunde) {
    return json({ error: 'Kunde nicht gefunden' }, { status: 401 });
  }


    // Warenkorb aus Request
  const { cart } = await request.json();//request.json() liest den Body der POST-Anfrage als JSON
  if (!Array.isArray(cart) || cart.length === 0) {//cart gültig
    return json({ error: "Warenkorb ist leer" }, { status: 400 });
  }


  // Bestellung anlegen, geht weil das hier eine +server Datei ist
  const bestellung = await db.bestellung.create({
    data: {
      kundenId,
      datum: new Date(),
      status: "offen"
    }
  });

  for (const item of cart) {
    const produkt = await db.produkt.findFirst({//sucht das passende Produkt in der DB anhand paramerter
      where: {
        name: {
      contains: item.product.name
    },
        farbe: item.variant.color,
        groesse: item.variant.size,
        logo: logoMap[item.variant.logo as keyof typeof logoMap]
      }
    });

    if (!produkt) continue;

    await db.bestellungProdukt.create({//verbindet die Bestellung mit den Produkten (Bestellpositionen)
      data: {
        bestellungId: bestellung.id,
        produktId: produkt.id,
        menge: item.quantity
      }
    });
    await db.produkt.update({//reduziert den Lagerbestand (bestand) um die bestellte Menge
  where: { id: produkt.id },
  data: {
    bestand: {
      decrement: item.quantity
    }
  }
});


  }

  return json({ success: true, bestellungId: bestellung.id });
}
