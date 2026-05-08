<script lang="ts">
  import { goto } from '$app/navigation';
import { page } from '$app/stores';
  import { fail, redirect } from '@sveltejs/kit';
  export let form: { error?: string };

  $: mode = $page.url.searchParams.get('mode') ?? 'login';
  $: isLogin = mode === 'login';

  function switchToRegister() {
    window.location.search = '?mode=register';
  }

  function switchToLogin() {
    window.location.search = '?mode=login';
  }

    
</script>

<div class="auth-page">


  <div class="auth-container">


    {#if isLogin}
    

      <button class=enterbtn type="button" on:click={switchToRegister}>Zur Registrierung wechseln</button>
    {:else}
      <button class=enterbtn type="button" on:click={switchToLogin}>Zum Login wechseln</button>

    
    {/if}

    {#if isLogin}
      <form method="POST" action="?/login">
        {#if form?.error}
          <div class="error-banner">{form.error}</div>
        {/if}
        <input class=btn-logreg name="email" type="email" placeholder="Email" required />
        <input class=btn-logreg name="password" type="password" placeholder="Passwort" required />
        <button class=enterbtn type="submit">Login</button>
      </form>
    {:else}
      <form method="POST" action="?/register" style="display: flex; flex-direction: column; gap: 1rem;">
        {#if form?.error}
          <div class="error-banner">{form.error}</div>
        {/if}
        <input class=btn-logreg name="email" type="email" placeholder="Email" required />
        <input class=btn-logreg name="password" type="password" placeholder="Passwort" required />
        <input class=btn-logreg name="name" placeholder="Name" required />
      

        <button class=enterbtn type="submit">Registrieren</button>

        


      </form>
      
    {/if}<form method="POST" action="?/gast">
      <button class="gast-btn"type="submit">Als Gast fortfahren</button>
      </form>

  </div>
  
</div>

<style>
.auth-page { 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  height: 100vh; 
  background-image: 
  url('insel.png');
  background-color: var(--bg);
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;}

.auth-container { 
  background-color: var(--bg); 
  padding: 2rem; 
  border-radius: 10px; 
  box-shadow: 0 5px 20px rgb(18, 173, 54); 
  width: 100%; 
  max-width: 500px; 
  display: flex; 
  flex-direction: 
  column; gap: 1rem; }

.btn-logreg {

  background-color: var(--bg-nav); 
  border: none; 
  color: var(--text); 
  font-size: 1rem; 
  cursor: pointer; 
  padding: 0.5rem 0.6rem; 
  border-radius: 4px;
}

.btn-logreg::placeholder {
    color: var(--text); /* oder eine beliebige Farbe */
    opacity: 0.5;  /* Firefox setzt opacity standardmäßig auf 0.54 */
}

.error-banner { 
  background-color: #f8d7da; 
  color: #721c24; 
  padding: 10px; 
  border-radius: 5px; }

.gast-btn { 
  background-color:var(--clickbtn); 
  border: none; 
  color: var(--text); 
  font-size: 1rem; 
  cursor: pointer; 
  padding: 0.5rem 0.6rem; 
  border-radius: 4px; 
  font-size: 1rem;
  width: fit-content;
}
.gast-btn:hover {
  background: var(--bg-nav-hover);
}

  .enterbtn{
  background-color: var(--clickbtn); 
  border: none; 
  color: var(--text); 
  font-size: 1rem; 
  cursor: pointer; 
  padding: 0.5rem 0.6rem; 
  border-radius: 4px;
  width: fit-content;
}

.enterbtn:hover {
  background: var(--bg-nav-hover);
}
</style>
