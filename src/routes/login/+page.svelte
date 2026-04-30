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
<form method="POST" action="?/gast">
  <button class="gast-btn"type="submit">Als Gast fortfahren</button>
</form>
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
      

        <button type="submit">Registrieren</button>

        


      </form>
    {/if}

  </div>
</div>

<style>
.auth-page { display: flex; justify-content: center; align-items: center; height: 100vh; background-image: url('insel.png'); background-size: cover; background-position: center; background-repeat: no-repeat;}
.auth-container { background-color: #065414; padding: 2rem; border-radius: 10px; box-shadow: 0 5px 20px rgb(18, 173, 54); width: 100%; max-width: 500px; display: flex; flex-direction: column; gap: 1rem; }
.error-banner { background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; }
.gast-btn { background-color:#065414; border: none; color: #ffffff; 
font-size: 1rem; cursor: pointer; padding: 0.5rem 0.6rem; 
border-radius: 4px; position: relative; 
top: 600px; left: 845px; font-size: 1rem;}
</style>
