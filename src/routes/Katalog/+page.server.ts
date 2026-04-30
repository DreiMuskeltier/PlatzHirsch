import type { PageServerLoad } from './$types';
import { db } from '$lib/db'; //Client

export const load: PageServerLoad = async () => {

  // Mapping der Katalog-IDs zu Produktnamen, werden aktuell anders als Farbe, Größe, Logo nicht aus DB gelesen
  const productNameMap: Record<number, string> = {
    1: "T-Shirt",
    2: "Pullover",
    3: "Jacke"
  };

  const products = [];

  for (const id in productNameMap) {
    const name = productNameMap[id];

    // Einen beliebigen Eintrag aus der DB holen, der mit Produkttyp anfängt
    const variant = await db.produkt.findFirst({
      where: {
        name: {
          startsWith: name
        }
      },
      select: { preis: true }
    });

    products.push({
      id: Number(id),
      name,
      price: variant?.preis ?? 0,  // nur falls nicht gefunden 
      // Der Rest bleibt Dummy — wird von /katalog/[id] überschrieben
      colors: [],
      sizes: [],
      logos: []
    });
  }

  return { products };
};
