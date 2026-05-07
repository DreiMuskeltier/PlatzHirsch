<script lang="ts">
  let offen = false;
  function toggleMenu() {
    offen = !offen;
  }


  function schließeBeiKlickAußen(event: MouseEvent) {
    const container = document.querySelector('.menu-container');
    if (offen && container && !container.contains(event.target as Node)) {
      offen = false;
    }
  }







</script>
<svelte:window on:click={schließeBeiKlickAußen} />

<div class="menu-container">
  <button type="button" class="menu-btn" on:click={toggleMenu}>
    ☰
  </button>

  {#if offen}
    <ul class="burger-menu">
      <li><a href="/">Home</a></li>
      <li><a href="/Karte">Karte</a></li>
      <li><a href="/Favoriten">Favoriten</a></li>
      <li><a href="/profil">Profil</a></li>
      <li><a href="/kontakt">Kontakt</a></li>
      <li>
        <form method="POST" action="?/logout">
          <button type="submit">Logout</button>
        </form>
      </li>
    </ul>
  {/if}
</div>

<style>
  .menu-btn {
    background: var(--bg-nav);
    border: none;
    color: var(--text-nav);
    font-size: 1rem;
    cursor: pointer;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .menu-btn:hover {
    background: var(--bg-nav-hover);
  }

  .menu-container {
    position: relative;
    margin-left: auto;
  }

  .burger-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 8px;
    list-style: none;
    padding: 8px 0;
    margin: 0;
    min-width: 160px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 100;
    overflow: hidden;
    z-index: 1000;
  }

  .burger-menu li a,
  .burger-menu li button {
    display: block;
    padding: 10px 16px;
    text-decoration: none;
    color: var(--text);
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s;
  }

.burger-menu button:hover {
    background: var(--bg-nav-hover);
  }

  .burger-menu li a:hover {
    background: var(--bg-nav-hover);
  }
</style>