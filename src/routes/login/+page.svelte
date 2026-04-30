<script lang="ts">
  import { page } from '$app/stores';
  export let form;

  // Login/Registrierung Umschalten
  $: mode = $page.url.searchParams.get('mode') ?? 'login';
  $: isLogin = mode === 'login';

  function switchToRegister() {
    window.location.search = '?mode=register';
  }

  function switchToLogin() {
    window.location.search = '?mode=login';
  }

  // Cookie-Popup Daten
  let showConsent = false;
  let pendingUserId: string | null = null;

  // Wenn Server needsConsent zurückgibt → Popup öffnen
  $: if (form?.needsConsent) {
    showConsent = true;
    pendingUserId = form.userId; //Fehler hier macht nix
  }
</script>

<div class="auth-page">
  <div class="auth-container">

    {#if isLogin}
      <button type="button" on:click={switchToRegister}>Zur Registrierung wechseln</button>
    {:else}
      <button type="button" on:click={switchToLogin}>Zum Login wechseln</button>
    {/if}

    {#if isLogin}
      <form method="POST" action="?/login">
        {#if form?.error}
          <div class="error-banner">{form.error}</div>
        {/if}

        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Passwort" required />
        <button type="submit">Login</button>
      </form>
    {:else}
      <form method="POST" action="?/register">
  {#if form?.error}
    <div class="error-banner">{form.error}</div>
  {/if}

  <input name="email" type="email" placeholder="Email" required />
  <input name="password" type="password" placeholder="Passwort" required />
  <input name="name" placeholder="Name" required />
  <input name="fname" placeholder="Vorname" required />
  <input name="dbirth" type="date" placeholder="Geburtsdatum" required />
  <input name="street" placeholder="Straße" required />
  <input name="hausnummer" placeholder="Hausnummer" required />
  <input name="ort" placeholder="Stadt" required />
  <input name="plz" placeholder="PLZ" required />

  <!-- DatenschutzbestimmungsBOX -->
  <label class="checkbox-field">
    <input type="checkbox" name="acceptPolicy" required />
    Ich akzeptiere die Datenschutzbestimmungen
  </label>

  <button type="submit">Registrieren</button>
</form>
    {/if}

    <img src="/hund1.jpeg" alt="Banner" />
  </div>
</div>

<!-- COOKIES aktzeptieren -->
{#if showConsent}
<div class="popup-overlay">
  <div class="popup">
    <h2>Cookies erlauben?</h2>
    <p>Diese Seite benötigt Cookies, um dich einzuloggen.</p>

    <form method="POST" action="?/consent">
      <input type="hidden" name="userId" value={pendingUserId} />
      <button class="accept" type="submit">Cookies erlauben</button>
    </form>

    <button class="cancel" on:click={() => showConsent = false}>Abbrechen</button>
  </div>
</div>
{/if}

<style>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #688a70;
}
.auth-container {
  background-color: #898a90;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.error-banner {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
}

/* Popup */
.popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.popup {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  width: 300px;
}

.popup button.accept {
  margin-top: 1rem;
  padding: 0.6rem 1rem;
  background: #3c6;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.popup button.cancel {
  margin-top: 0.7rem;
  padding: 0.5rem 1rem;
  background: #999;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
