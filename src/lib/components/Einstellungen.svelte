<script lang="ts">
  import { einstellungen } from '$lib/stores/einstellungen';
  
  let offen = false;
</script>

<!-- Toggle Button -->
<button class="einstellungen-btn" on:click={() => offen = !offen}>
  ⚙️
</button>

<!-- Panel -->
{#if offen}
  <div class="panel">
    <h3>Einstellungen</h3>

    <!-- Darkmode -->
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

    <!-- Schriftgröße -->
    <div class="zeile">
      <span>Schrift</span>
      <div class="schrift-buttons">
        <button on:click={() => einstellungen.update(e => ({ ...e, schriftgroesse: Math.max(12, e.schriftgroesse - 2) }))}>A-</button>
        <span>{$einstellungen.schriftgroesse}px</span>
        <button on:click={() => einstellungen.update(e => ({ ...e, schriftgroesse: Math.min(24, e.schriftgroesse + 2) }))}>A+</button>
      </div>
    </div>

    <!-- Reset -->
    <button class="reset" on:click={() => einstellungen.set({ darkmode: false, schriftgroesse: 16 })}>
      Zurücksetzen
    </button>
  </div>
{/if}

<style>
  .einstellungen-btn {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background: #3b82f6;
    font-size: 1.3rem;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    z-index: 1000;
  }

  .panel {
    position: fixed;
    bottom: 5rem;
    right: 1.5rem;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 1rem;
    width: 220px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: var(--bg-nav-hover);
    color: var(--text-nav);
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
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .toggle.aktiv { background: #1e293b; }

  .schrift-buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .schrift-buttons button {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    cursor: pointer;
    font-weight: bold;
  }

  .reset {
    font-size: 0.8rem;
    color: #9ca3af;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }
</style>