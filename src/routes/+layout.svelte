<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import Menu from '$lib/components/Menu.svelte';
  import 'leaflet/dist/leaflet.css';
  import { goto } from '$app/navigation';
  import { einstellungen } from '$lib/stores/einstellungen';
  import Einstellungen from '$lib/components/Einstellungen.svelte';

  export let data: { flash?: string };

  function goToHome() { goto('/'); }
  function goTokarte() { goto('/Karte'); }
  function goToprofil() { goto('/profil'); }
  function goTofavoriten() { goto('/Favoriten'); }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="app" class:dark={$einstellungen.darkmode} style="font-size: {$einstellungen.schriftgroesse}px">

  <Einstellungen />

  {#if data.flash}
    <div class="flash-banner">{data.flash}</div>
  {/if}

  <nav>
    <button on:click={goToHome}>Home 🏠</button>
    <button on:click={goTokarte}>Karte 🧭</button>
    <button on:click={goTofavoriten}>Favoriten ♥️</button>
    <button on:click={goToprofil}>Profil 👤</button>
    <Menu />
  </nav>

  <slot />

  <footer class="footer-fixed">
    <p>© 2026 Mein Unternehmen. Alle Rechte vorbehalten. | <a href="/impressum">Impressum</a></p>
  </footer>

</div>

<style>
  .app {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    transition: background 0.3s, color 0.3s;

    /* Light Mode */
    --bg:           #ffffff;
    --text:         #000000;
    --bg-card:      #f5f5f5;
    --bg-nav:       #cdf4d3;
    --text-nav:     #149753;
    --bg-nav-hover: #84ce8e;
    --bg-flash:     #d4edda;
    --text-flash:   #155724;
    --bg-footer:    #f5f5f5;
    --border:       #dddddd;
    --link:         #149753;
  }

  .app.dark {
    /* Dark Mode */
    --bg:           #1a1a1a;
    --text:         #f0f0f0;
    --bg-card:      #2a2a2a;
    --bg-nav:       #1e3a2a;
    --text-nav:     #4ade80;
    --bg-nav-hover: #2d5a3d;
    --bg-flash:     #1a2e1a;
    --text-flash:   #86efac;
    --bg-footer:    #111111;
    --border:       #333333;
    --link:         #4ade80;
  }

  nav {
    display: flex;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: var(--bg-card);
    border-bottom: 1px solid var(--border);
  }

  nav button {
    background: var(--bg-nav);
    border: none;
    color: var(--text-nav);
    font-size: 1rem;
    cursor: pointer;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    transition: background 0.2s;
  }

  nav button:hover {
    background: var(--bg-nav-hover);
  }

  .flash-banner {
    background: var(--bg-flash);
    color: var(--text-flash);
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem;
    border: 1px solid var(--border);
  }

  .footer-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3rem;
    text-align: center;
    background: var(--bg-footer);
    color: var(--text);
    line-height: 3rem;
    border-top: 1px solid var(--border);
    font-size: 0.9rem;
    z-index: 999;
  }

  .footer-fixed a {
    color: var(--link);
    text-decoration: none;
  }

  .footer-fixed a:hover {
    text-decoration: underline;
  }
</style>