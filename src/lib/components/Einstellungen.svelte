<script lang="ts">
  import { einstellungen } from '$lib/stores/einstellungen';
  
  let offen = false;
  let container: HTMLElement;

  function schließeBeiKlickAußen(event: MouseEvent) {
    if (offen && container && !container.contains(event.target as Node)) {
      offen = false;
    }
  }
</script>

<svelte:window on:click={schließeBeiKlickAußen} />

<div bind:this={container}>
  <button class="einstellungen-btn" on:click|stopPropagation={() => offen = !offen}>
    ⚙️
  </button>

  {#if offen}
  <div class="panel">
    <h3>Einstellungen</h3>
    <div class="zeile">
      <span>Darkmode</span>
      <button
        class="toggle"
        class:aktiv={$einstellungen.darkmode}
        on:click={() => einstellungen.update(e => ({ ...e, darkmode: !e.darkmode }))}
      >
        {$einstellungen.darkmode ? '🌙' : '☀️'}
      </button>
    </div>
    <div class="zeile">
      <span>Schrift</span>
      <div class="schrift-buttons">
        <button on:click={() => einstellungen.update(e => ({ ...e, schriftgroesse: Math.max(12, e.schriftgroesse - 2) }))}>A-</button>
        <span>{$einstellungen.schriftgroesse}px</span>
        <button on:click={() => einstellungen.update(e => ({ ...e, schriftgroesse: Math.min(24, e.schriftgroesse + 2) }))}>A+</button>
      </div>
    </div>
    <button class="reset" on:click={() => einstellungen.set({ darkmode: false, schriftgroesse: 16 })}>
      Zurücksetzen
    </button>
  </div>
  {/if}
</div>

<style>
.einstellungen-btn {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--bg-nav);
  color: var(--text-nav);
  font-size: 1.3rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  z-index: 1000;
  transition: background 0.2s;
}
.einstellungen-btn:hover {
  background: var(--bg-nav-hover);
}
.panel {
  position: fixed;
  bottom: 5rem;
  right: 1.5rem;
  background: var(--bg-nav);
  color: var(--text-nav);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem;
  width: 220px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
h3 { margin: 0; font-size: 1rem; }
.zeile {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.toggle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--bg-nav);
  color: var(--text-nav);
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s;
}
.toggle:hover {
  background: var(--bg-nav-hover);
}
.toggle.aktiv {
  background: var(--bg-nav-hover);
}
.schrift-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.schrift-buttons button {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-nav);
  color: var(--text-nav);
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}
.schrift-buttons button:hover {
  background: var(--bg-nav-hover);
}
.reset {
  font-size: 0.8rem;
  color: var(--text-nav);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  opacity: 0.6;
  transition: opacity 0.2s;
}
.reset:hover {
  opacity: 1;
}
</style>