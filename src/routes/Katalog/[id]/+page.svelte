<script lang="ts">
  import { addItem } from '$lib/stores/cart';
  import type { Product, SelectedVariant } from '$lib/types/product';

  export let data: { product: Product };
  const product = data.product;

  let selected: SelectedVariant = {
    color: product.colors[0],
    logo: product.logos[0],
    size: product.sizes[0]
  };

  const logoMap: Record<"Großes Logo" | "Kleines Logo" | "Kein Logo", number> = {
    "Großes Logo": 1,
    "Kleines Logo": 2,
    "Kein Logo": 3
  };

  async function addToCart() {
    const res = await fetch('/api/checkStock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: product.name,
        color: selected.color,
        size: selected.size,
        logoId: logoMap[selected.logo as keyof typeof logoMap]
      })
    });

    const data = await res.json();

    if (!data.ok) {
      alert(`Diese Variante hat nur ${data.bestand ?? 0} Stück auf Lager. Mindestbestand: 10.`);
      return;
    }

    addItem(product, { ...selected });
  }
</script>

<div class="product-container">
  <div class="product-card">
    <h1>{product.name}</h1>

    <p class="price">{product.price} €</p>

    <div class="selector">
      <label>Farbe</label>
      <select bind:value={selected.color}>
        {#each product.colors as c}
          <option value={c}>{c}</option>
        {/each}
      </select>
    </div>

    <div class="selector">
      <label>Logo</label>
      <select bind:value={selected.logo}>
        {#each product.logos as l}
          <option value={l}>{l}</option>
        {/each}
      </select>
    </div>

    <div class="selector">
      <label>Größe</label>
      <select bind:value={selected.size}>
        {#each product.sizes as s}
          <option value={s}>{s}</option>
        {/each}
      </select>
    </div>

    <button class="add-btn" on:click={addToCart}>
      In den Warenkorb
    </button>
  </div>
</div>

<style>
  .product-container {
    display: flex;
    justify-content: center;
    padding: 2rem;
    padding-bottom: 8rem; /* Platz für den Warenkorb */
  }

  .product-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 400px;
    width: 100%;

    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);

    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  h1 {
    text-align: center;
    margin: 0;
    color: #222;
  }

  .price {
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
    color: #444;
  }

  .selector label {
    display: block;
    margin-bottom: 0.3rem;
    font-weight: 600;
    color: #333;
  }

  select {
    width: 100%;
    padding: 0.6rem;
    font-size: 1rem;

    border-radius: 6px;
    border: 1px solid #ccc;

    background: #fafafa;
    cursor: pointer;

    transition: border 0.15s ease;
  }

  select:focus {
    border-color: #0077cc;
    outline: none;
  }

  .add-btn {
    margin-top: 1rem;
    padding: 0.9rem;
    font-size: 1.1rem;
    font-weight: bold;

    color: white;
    background: #007700;
    border: none;

    border-radius: 8px;
    cursor: pointer;

    transition: background 0.15s ease;
  }

  .add-btn:hover {
    background: #009900;
  }
</style>
