<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
  	import { cart, removeItem, setQuantity, totalPrice, clearCart, checkout } from '$lib/stores/cart';
  	import { onMount } from 'svelte';
  export let data: { flash?: string };
	let showConfirmation = false;

  function placeOrder() {
    checkout();
    showConfirmation = true;
  }

    import { goto } from '$app/navigation';

  function goToHome() {
    goto('/');
  }

  function goToKatalog() {
    goto('/Katalog');
  }

  function goTodashboard() {// zum Dashboard direkt nach Login
    goto('/dashboard');}

    function goTologin() {
    goto('/login');
  }
  function goToregistration() {
    goto('/login?mode=register');
  }

</script>

{#if data.flash}
  <div class="flash-banner">{data.flash}</div>
{/if}

<nav>
   <button on:click={goToHome}>Home</button>
  <button on:click={goToKatalog}>Katalog</button>
  <button on:click={goTodashboard}>Dashboard</button>
  <button on:click={goTologin}>Login</button>
  <button on:click={goToregistration}>Registrieren</button>
</nav>


<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<slot />
<div class="cart-bar">
  <h3>Warenkorb</h3>

  {#if $cart.length === 0}
    <p>Der Warenkorb ist leer.</p>
  {:else}
    <ul>
      {#each $cart as item}
        <li class="cart-row">
          <div class="left">
            <strong>{item.product.name}</strong>
            <div class="variant">
              {item.variant.color}, {item.variant.logo}, {item.variant.size}
            </div>
            <div class="price">
              Einzelpreis: {item.product.price} €
            </div>
          </div>

          <div class="qty-controls">
            <button on:click={() => setQuantity(item.product.id, item.variant, Math.max(1, item.quantity - 1))}>−</button>
            <span>{item.quantity}</span>
            <button on:click={() => setQuantity(item.product.id, item.variant, item.quantity + 1)}>+</button>
          </div>

          <div class="line-total">
            {(item.quantity * item.product.price).toFixed(2)} €
          </div>

          <button
            class="remove-btn"
            on:click={() => removeItem(item.product.id, item.variant)}
          >
            ✕
          </button>
        </li>
      {/each}
    </ul>

    <div class="total">
      Gesamtpreis: <strong>{$totalPrice.toFixed(2)} €</strong>
    </div>

    <button class="checkout-btn" on:click={placeOrder}>
      Bestellung abschicken
    </button>
  {/if}
</div>

<!-- Bestellbestätigung Popup -->
{#if showConfirmation}
  <div class="popup-overlay">
    <div class="popup">
      <h2>Bestellung abgeschickt!</h2>
      <p>Rechnung kommt per Mail.</p>

      <button on:click={() => (showConfirmation = false)}>
        OK
      </button>
    </div>
  </div>
{/if}


<!-- Footer / Impressum -->
<footer class="footer-fixed">
  <p>© 2025 Mein Unternehmen. Alle Rechte vorbehalten. | <a href="/impressum">Impressum</a></p>
</footer>


<style>

    nav {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  nav button {
    background: none;
    border: none;
    color: #0077cc;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
  }

  nav button:hover {
    background-color: #e0f0ff;
  }


 .flash-banner {
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem;
  border: 1px solid #15572455;
}

 
  .cart-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    background: #222;
    color: white;

    padding: 1rem;
    border-top: 2px solid #444;

    max-height: 32vh;
    overflow-y: auto;
    box-shadow: 0 -2px 4px rgba(0,0,0,0.3);
  }

  .cart-bar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .cart-row {
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    gap: 1rem;
    align-items: center;
    margin-bottom: 0.5rem;
    padding: 0.3rem;
    background: #333;
    border-radius: 4px;
  }

  .left {
    display: flex;
    flex-direction: column;
  }

  .variant {
    font-size: 0.9rem;
    color: #ccc;
  }

  .price {
    font-size: 0.9rem;
    color: #aaa;
  }

  .qty-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .qty-controls button {
    width: 28px;
    height: 28px;
    background: #444;
    border: none;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }

  .qty-controls span {
    width: 24px;
    text-align: center;
  }

  .line-total {
    font-weight: bold;
    min-width: 70px;
    text-align: right;
  }

  .remove-btn {
    background: #660000;
    border: none;
    color: white;
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .checkout-btn {
    margin-top: 1rem;
    padding: 0.7rem 1.2rem;
    background: #007700;
    border: none;
    color: white;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
  }

  .total {
    margin-top: 1rem;
    font-size: 1.2rem;
    text-align: right;
  }

  /* Popup */
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: rgba(0, 0, 0, 0.7);

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 99999999;
  }

  .popup {
    background: white;
    color: black;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    width: 300px;
  }

  .popup button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    background: #444;
    color: white;
    border-radius: 6px;
    cursor: pointer;
  }

.footer-fixed {
  position: static; /* statt fixed */
  margin-top: 3rem;
}

</style>


