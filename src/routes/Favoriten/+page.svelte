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
    border: 2px solid #3b82f6;
    background: white;
    font-size: 1.5rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .rund:hover { background: #eff6ff; }

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

  .leer { color: #9ca3af; font-style: italic; }

  /* Karte */
  .karte-bereich { height: 400px; }

  /* Bewertung */
  .bewertung-bereich {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 400px;
  }

  select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }

  .sterne { display: flex; gap: 0.25rem; }

  .stern {
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #d1d5db;
    transition: color 0.15s;
  }

  .stern.aktiv { color: #f59e0b; }

  .speichern {
    padding: 0.5rem 1rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
</style>