<script lang="ts">
  let offen = false;

  function toggleMenu() {
    offen = !offen;
  }
</script>

<div class="menu-container">
  <button type="button" class="menu-btn" on:click={toggleMenu}>
    ☰
  </button>

  {#if offen}
    <ul class="burger-menu">
      <li><a href="/">Home</a></li>
      <li><a href="/Karte">Karte </a></li>
      <li><a href="/Favoriten">Favoriten</a></li>
      <li><a href="/profil">Profil</a></li>
      <li><a href="/einstellungen">Einstellungen</a></li>
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
  

  background: #cdf4d3!important;
    border: none;
    color: #149753;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
  
}
.menu-btn:hover,
  .menu-btn:hover {
    background: #84ce8e!important;
  }

  
  .menu-container {
    position: relative;
    margin-left: auto;
    
  }

  .burger-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background:  #cdf4d3;
    border: 1px solid #ffffff;
    border-radius: 8px;
    list-style: none;
    padding: 8px 0;
    margin: 0;
    min-width: 160px;
    box-shadow: 0 4px 12px rgba(215, 27, 27, 0.1);
  }

  .burger-menu li a,
  .burger-menu li button {
    display: block;
    padding: 20px 16px;
    text-decoration: none;
    color: black;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }

  .burger-menu li a:hover,
  .burger-menu li button:hover {
    background: #84ce8e;
  }
</style>