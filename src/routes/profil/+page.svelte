<h1>Willkommen im Profil!</h1> 
<!-- <p>Hallo {data.user.name},</p>  -->
 <p>AHOI</p>

<script lang="ts">
  import { goto } from '$app/navigation';

  function switchTouserbereich() {
    goto('/profil/userbereich');
  }

  export let data;

</script>

<button type="button" on:click={switchTouserbereich}>Profil bearbeiten</button>

<form method="POST" action="?/logout">
  <button type="submit">Logout</button>
</form>

<div class="home-page">
</div>

<style>
.home-page { 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  height: 100vh; 
  background-color: #a2e2d8; 
}
</style>
