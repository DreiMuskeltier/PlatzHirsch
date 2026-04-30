import { json } from '@sveltejs/kit';
import { db } from '$lib/db'; 

// Funktion checkt, ob Bestand da ist
export async function POST({ request }) { //solche Fehler sind ignorierbar
    const { name, color, size, logoId } = await request.json();
    // DEBUGGING: klappt :)
console.log("CHECK:", { name, color, size, logoId });
    const variant = await db.produkt.findFirst({
        where: {
            name: {startsWith: name},
            farbe: color,
            groesse: size,
            logo: logoId
        },
        select: {
            bestand: true
        }
    });

    if (!variant) {
        return json({ ok: false, reason: "not_found" });
    }

    return json({
        ok: variant.bestand > 10,
        bestand: variant.bestand
    });
}
