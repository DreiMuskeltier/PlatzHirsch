import type { PageServerLoad } from './$types';
import { db } from '$lib/db'; // @Hannah, liegt da dein Prisma Client?

export const load: PageServerLoad = async ({ params }) => {
  const id = Number(params.id);

  // ist das noch notwendig ?!?
  const productNameMap: Record<number, string> = {
    1: "T-Shirt",
    2: "Pullover",
    3: "Jacke"
  };

  const name = productNameMap[id];
  if (!name) {
    return { product: null };
  }

  // Alle Kombis finden mit passendem Namen (skaliert vertikal)
  const variants = await db.produkt.findMany({
    where: {
      name: {
        startsWith: name,
      }
    },
    include: {
      logoart: true  // notwendig, damit Zwischentabelle zu Logos funktioniert
    }
  });

  
  const colors = [...new Set(variants.map(v => v.farbe))];
  const sizes  = [...new Set(variants.map(v => v.groesse))];
  const logos  = [...new Set(variants.map(v => v.logoart.name))];

  return {
    product: {
      id,
      name,
      price: variants[0]?.preis ?? 0,  // Preishandling fehlt noch
      colors,
      sizes,
      logos
    }
  };
};
