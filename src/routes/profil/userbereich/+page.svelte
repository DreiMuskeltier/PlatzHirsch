<h1>Profil bearbeiten</h1> 
<p>Hallo {data.user.name},</p> 
 
<script lang="ts">
  import { goto } from '$app/navigation';

  function switchToProfil() {
    goto('/profil');
  }

  type PageData = {
    user: {
      name: string;
    };
    flash?: string;
  };

  export let data: PageData;

</script>

<button type="button" on:click={switchToProfil}>Zurück</button>

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
