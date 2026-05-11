<script lang="ts">
  import { onMount } from 'svelte';
  import Map from '$lib/components/Map.svelte';
   

  type Ort = {
    id: string;
    name: string;
    beschreibung: string;
    lat: number;
    lng: number;
    tags: { tag: string }[];
  };

  let favoriten: Ort[] = [];
  let besuchteOrte: Ort[] = [];
  let ausgewaehlterOrt: Ort | null = null;
  let sterne = 0;
  let hover = 0;
  let popupOrt: Ort | null = null;

  onMount(async () => {
    const res = await fetch('/Favoriten');
    favoriten = await res.json();
  });

  async function toggleFavorit(ortId: string) {
    await fetch('/Favoriten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ortId })
    });
    // Aus Liste entfernen
    favoriten = favoriten.filter(o => o.id !== ortId);
  }

  async function bewerten() {
    if (!ausgewaehlterOrt || sterne === 0) return;
    await fetch('/bewertung', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ortId: ausgewaehlterOrt.id, sterne })
    });
    sterne = 0;
    ausgewaehlterOrt = null;
  }

  // Icons je nach Tag
  const kategorieIcon: Record<string, string> = {
    Park: '🌳',
    Restaurant: '🍽️',
    Sport: '⚽',
    Schule: '🏫',
    default: '📍'
  };

  function getIcon(ort: Ort) {
    const tag = ort.tags?.[0]?.tag ?? 'default';
    return kategorieIcon[tag] ?? kategorieIcon.default;
  }
</script>

<div class="seite">

  <!-- Runde Buttons mit Icons -->
  <div class="buttons-bereich">
    <h2>Meine Favoriten</h2>
    <div class="buttons">
      {#each favoriten as ort}
        <div class="ort-button">
          <button class="rund" title={ort.name}>
            {getIcon(ort)}
          </button>
          <span class="label">{ort.name}</span>
          <button class="entfernen" on:click={() => toggleFavorit(ort.id)}>✕</button>
        </div>
      {/each}

      {#if favoriten.length === 0}
        <p class="leer">Noch keine Favoriten gespeichert.</p>
      {/if}
    </div>
  </div>

  <!-- Listendarstellung -->
<div class="listen-bereich">
  <h2>Liste</h2>

  {#if favoriten.length === 0}
    <p class="leer">Noch keine Favoriten gespeichert.</p>
  {:else}
    <ul class="liste">
      {#each favoriten as ort}
        <button class="ort-item" on:click={() => popupOrt = ort}>
    
          <span class="name">{ort.name}</span>
          
        </button>
      {/each}
    </ul>
  {/if}
</div>

<!-- Popup -->
{#if popupOrt}
  <div class="overlay" role="presentation" on:click={() => popupOrt = null}>
    <div class="overpopup" role="dialog" tabindex="0" on:click|stopPropagation on:keydown|stopPropagation>
      <div class="overpopup-header">
        <h3>{getIcon(popupOrt)} {popupOrt.name}</h3>
        <button class="schliessen" on:click={() => popupOrt = null}>✕</button>
      </div>
      {#if popupOrt.tags?.length}
        <div class="tags">
          {#each popupOrt.tags as t}
            <span class="tag">{t.tag}</span>
          {/each}
        </div>
      {/if}
      <p class="beschreibung">{popupOrt.beschreibung ?? 'Keine Beschreibung vorhanden.'}</p>
      <button class="entfernen-btn" on:click={() => toggleFavorit(popupOrt!.id)}>
        ✕ Aus Favoriten entfernen
      </button>
    </div>
  </div>
{/if}



  <!-- Besuchte Orte Dropdown + Bewertung -->
  <div class="bewertung-bereich">
    <h2>Besuchte Orte bewerten</h2>

    <select bind:value={ausgewaehlterOrt}>
      <option value={null}>Ort auswählen...</option>
      {#each favoriten as ort}
        <option value={ort}>{ort.name}</option>
      {/each}
    </select>

    {#if ausgewaehlterOrt}
      <div class="sterne">
        {#each [1, 2, 3, 4, 5] as n}
          <button
            class="stern"
            class:aktiv={n <= (hover || sterne)}
            on:mouseenter={() => hover = n}
            on:mouseleave={() => hover = 0}
            on:click={() => sterne = n}
          >
            ★
          </button>
        {/each}
      </div>
      <button class="speichern" on:click={bewerten}>Bewertung speichern</button>
    {/if}
  </div>

</div>

<style>
  .seite {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem;
  }

  h2 { margin-bottom: 0.5rem; }

  /* Runde Buttons */
  .buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .ort-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    position: relative;
  }

  .rund {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid var(--border);
    background: var(--bg-nav);
    font-size: 1.5rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .rund:hover { background:var(--bg-nav-hover)}

  .label {
    font-size: 0.75rem;
    text-align: center;
    max-width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .entfernen {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    background: #ef4444;
    color: white;
    font-size: 0.6rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .leer { color:var(--text); font-style: italic; }


/*Listendarstellung*/
.liste {
  list-style: none;
  background: var(--bg-nav);
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 300px;
  border-radius: 4px;
  font-size: 1rem;
  border: none; 
  color: var(--text); 
}

.ort-item {
  
  align-items: center;
  gap: 0.75rem;
  padding: 0rem 0.5rem;
  background: var(--bg-nav);
  border: 1px solid var(--invisborder);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
  
}

.ort-item:hover { background: var(--bg-nav-hover); }
.icon { font-size: 1.25rem; }
.name { flex: 1; font-size: 1rem; }
.pfeil { color: var(--text); opacity: 0.4; font-size: 1.1rem; }

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overpopup {
  background: var(--bg-nav);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  width: 340px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.overpopup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.overpopup-header h3 { margin: 0; font-size: 1.1rem; }

.schliessen {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: var(--text);
  opacity: 0.6;
}

.schliessen:hover { opacity: 1; }

.tags { display: flex; flex-wrap: wrap; gap: 6px; }

.tag {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text);
}

.beschreibung {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
  line-height: 1.6;
}

.entfernen-btn {
  padding: 0.4rem 0.75rem;
  background: none;
  border: 1px solid #ef4444;
  color: #ef4444;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  align-self: flex-start;
}

.entfernen-btn:hover { background: #ef444420; }
  /* Karte */
  .karte-bereich { height: 400px; }

  /* Bewertung */
  .bewertung-bereich {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 400px;
    background: var(--bg);
    background-color: var(--bg);
  }
 
  select {
    padding: 0.5rem;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 1rem;
    background: var(--bg-nav);
    color: var(--text);
    cursor: pointer;
  }
  select:hover { background:var(--bg-nav-hover)}

  .sterne { display: flex; gap: 0.25rem; }

  .stern {
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-nav);
    transition: color 0.15s;
  }

  .stern.aktiv { color: var(--text-nav); }

  .speichern {
    padding: 0.5rem 0.5rem 0.5rem;
    background: var(--bg-nav);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 6px;
    cursor: pointer;
  }

  .speichern:hover { background:var(--bg-nav-hover)}

</style>