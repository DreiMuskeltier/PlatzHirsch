<script lang="ts">
  import type { Product } from '$lib/types/product';

  export let data: {
    products: Product[];
  };
</script>

<h1 class="catalog-title">Katalog</h1>

<div class="catalog-grid">
  {#each data.products as p}
    <a class="card" href={`/Katalog/${p.id}`}>
      <h2>{p.name}</h2>
      <p class="price">{p.price} €</p>
    </a>
  {/each}
</div>

<style>
  /* Titel */
  .catalog-title {
    text-align: center;
    margin: 1rem 0 2rem 0;
    color: #222;
  }

  /* Grid – responsiv */
  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
    padding-bottom: 8rem; /* Platz über dem Warenkorb */
  }

  /* Produktkarten */
  .card {
    background: rgb(166, 208, 215);
    border-radius: 10px;
    padding: 1.2rem;
    text-decoration: none;
    color: #222;

    border: 1px solid #ddd;

    /* leichter Schatten, passend zum dunklen Warenkorb */
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);

    transition: transform 0.12s ease, box-shadow 0.12s ease;
  }

  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.18);
  }

  /* Preis */
  .price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #444;
    margin-top: 0.5rem;
  }
</style>
