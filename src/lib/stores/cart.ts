import { writable } from 'svelte/store';
import type { CartState, Product, SelectedVariant } from '$lib/types/product';
import { derived } from 'svelte/store';
// gespeicherter Zustand (sessionStorage)
const initial: CartState =
  typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('cart') || '[]')
    : [];

export const cart = writable<CartState>(initial);
export const totalPrice = derived(cart, ($cart) =>
  $cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  )
);
// automatisch speichern
cart.subscribe((value) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('cart', JSON.stringify(value));
  }
});

/** Produkt + Variante zum Warenkorb hinzufügen */
export function addItem(product: Product, variant: SelectedVariant) {
  cart.update((items) => {
    const existing = items.find(
      (i) =>
        i.product.id === product.id &&
        i.variant.color === variant.color &&
        i.variant.size === variant.size &&
        i.variant.logo === variant.logo
    );

    if (existing) {
      return items.map((i) =>
        i === existing ? { ...i, quantity: i.quantity + 1 } : i
      );
    }

    return [...items, { product, variant, quantity: 1 }];
  });
}
export function clearCart() {
  cart.set([]);
}
/** Produkt entfernen */
export function removeItem(productId: number, variant: SelectedVariant) {
  cart.update((items) =>
    items.filter(
      (i) =>
        !(
          i.product.id === productId &&
          i.variant.color === variant.color &&
          i.variant.size === variant.size &&
          i.variant.logo === variant.logo
        )
    )
  );
}

/** Menge setzen für später (optional) */
export function setQuantity(
  productId: number,
  variant: SelectedVariant,
  quantity: number
) {
  cart.update((items) =>
    items.map((i) =>
      i.product.id === productId &&
      i.variant.color === variant.color &&
      i.variant.size === variant.size &&
      i.variant.logo === variant.logo
        ? { ...i, quantity }
        : i
    )
  );
}

export async function checkout(): Promise<{ success: boolean; message: string }> {
  if (typeof window === 'undefined') return { success: false, message: 'Client only' };

  const cartValue = JSON.parse(sessionStorage.getItem('cart') || '[]');

  const response = await fetch('/api/bestellung', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart: cartValue })
  });

  if (!response.ok) {
    const err = await response.json();
    return { success: false, message: err.error || 'Fehler beim Abschicken' };
  }

  clearCart(); // Warenkorb lokal leeren

  return { success: true, message: 'Bestellung erfolgreich gespeichert' };
}