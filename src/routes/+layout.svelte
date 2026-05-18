<script lang="ts">
  import PlatzHirschLogo from '$lib/assets/PlatzHirschLogo.png';
  import Menu from '$lib/components/Menu.svelte';
  import 'leaflet/dist/leaflet.css';
  import { goto } from '$app/navigation';
  import { einstellungen } from '$lib/stores/einstellungen';
  import Einstellungen from '$lib/components/Einstellungen.svelte';
  import { onMount } from 'svelte';  
   import { gesuchterOrt } from '$lib/stores/gesuchterOrt';


  export let data: { flash?: string };

 let geladen = false;  
   onMount(() => {
    geladen = true;  
  });


  function goToHome() { goto('/'); }
  function goTokarte() { goto('/Karte'); }
  function goToprofil() { goto('/profil'); }
  function goTofavoriten() { goto('/Favoriten'); }


//Suchen

let suchbegriff = '';
  let ergebnisse: any[] = [];
  let suchTimeout: any;

  // Wird bei jedem Tastendruck aufgerufen
  async function beiEingabe() {
    // Debounce: wartet 300ms nach dem letzten Tastendruck
    // verhindert dass bei jedem Buchstaben eine Anfrage geschickt wird
    clearTimeout(suchTimeout);
    suchTimeout = setTimeout(async () => {
      if (suchbegriff.length < 2) {
        ergebnisse = [];
        return;
      }
      const res = await fetch(`/api/ort/suche?q=${suchbegriff}`);
      ergebnisse = await res.json();
    }, 300);
  }

  function ortAuswaehlen(ort: any) {
    // Ort in den Store schreiben → Map.svelte reagiert darauf
    gesuchterOrt.set(ort);
    // Zur Karte navigieren falls nicht schon dort
    goto('/Karte');
    // Suchfeld leeren
    suchbegriff = '';
    ergebnisse = [];
  }

</script>

<svelte:head>
  <link rel="icon" href={PlatzHirschLogo} />
</svelte:head>

<div class="app" class:dark={$einstellungen.darkmode} style="font-size: {$einstellungen.schriftgroesse}px">

  <Einstellungen />

  {#if data.flash}
    <div class="flash-banner">{data.flash}</div>
  {/if}
  
  <nav>
  <button class="logo-button" on:click={goToHome} aria-label="Home">
  {#if geladen}
    <img 
      src={$einstellungen.darkmode ? '/PlatzHirschLogoDarkMode.png' : '/PlatzHirschLogoLightMode.png'}
      alt="PlatzHirsch" 
    />
  {:else}
    <img src="/PlatzHirschLogoLightMode.png" alt="PlatzHirsch" />
    
  {/if}
</button>
    <button on:click={goToHome} aria-label="Home">Home 🏠</button>
    <button on:click={goTokarte} aria-label="Karte">Karte 🧭</button>
    <button on:click={goTofavoriten} aria-label="Favoriten">Favoriten ♥️</button>
    <button on:click={goToprofil} aria-label="Profil">Profil 👤</button>

     <!-- Suchleiste -->
  <div class="suche-container">
    <input
      class="suche-input"
      type="text"
      placeholder="Ort finden..."
      bind:value={suchbegriff}
      on:input={beiEingabe}
    />
    {#if ergebnisse.length > 0}
      <div class="suche-dropdown">
        {#each ergebnisse as ort}
          <button class="suche-ergebnis" on:click={() => ortAuswaehlen(ort)}>
            {ort.name}
          </button>
        {/each}
      </div>
    {/if}
  </div>


    <Menu />
  </nav>

  <slot />

  <footer class="footer-fixed">
    <p>© {new Date().getFullYear()} PlatzHirsch. Alle Rechte vorbehalten. | <a href="/impressum">Impressum</a></p>
  </footer>

</div>

<style>
  .app {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    transition: background 0.3s, color 0.3s;

    /* Light Mode */
    --bg:           #edfff4;
    --text:         #005e31;
    --text-hover:   #05ff8a;
    --bg-card:      #edfff4;
    --bg-nav:       #cdf4d3;
    --text-nav:     #149753;
    --bg-nav-hover: #84ce8e;
    --bg-flash:     #d4edda;
    --text-flash:   #155724;
    --bg-footer:    #edfff4;
    --border:       #dee6dc;
    --invisborder:  #cdf4d3;
    --link:         #149753;
    --clickbtn:     #5ede72;
  }

  .app.dark {
    /* Dark Mode */
    --bg:           #08571f;
    --text:         #ebffea;
    --text-hover:   #aff88f;
    --bg-card:       #08571f;
    --bg-nav:       #237f4b;
    --text-nav:     #4ade80;
    --bg-nav-hover: #4e8360;
    --bg-flash:     #315b31;
    --text-flash:   #86efac;
    --bg-footer:     #08571f;
    --border:        #0e9635;
     --invisborder:        #237f4b;
    --link:         #4ade80;
    --clickbtn:         #23ba5a;
  }

.logo-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  height: 100%;
}

.logo-button img {
  height: 2.5rem;  /* ← hier die Größe anpassen */
}

  nav {
   
    display: flex;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: var(--bg-card);
    border-bottom: 1px solid var(--border);
    align-items: center;
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
    align-items: center;
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

  /*Suche*/
  .suche-container {
  position: relative;  /* damit das Dropdown absolut dazu positioniert werden kann */
}

.suche-input {
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  font-size: 1rem;
  width: 180px;
}

.suche-dropdown {
  position: absolute;   /* schwebt über dem Rest der Seite */
  top: 100%;            /* direkt unter dem Input */
  left: 0;
  right: 0;
  background: var(--bg-nav);
  border: 1px solid var(--border);
  border-radius: 4px;
  z-index: 2000;        /* über der Karte und Nav */
  display: flex;
  flex-direction: column;
}

.suche-ergebnis {
  padding: 0.5rem;
  text-align: left;
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
  font-size: 0.95rem;
}

.suche-ergebnis:hover {
  background: var(--bg-nav-hover);
}
</style>