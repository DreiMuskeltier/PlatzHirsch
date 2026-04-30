<h1>Willkommen im Dashboard!</h1> 
<p>Hallo {data.kunde.fname},</p>  <!--{data.kunde.name} -->
 <p>Du bist eingeloggt!</p>

<script lang="ts">
  import { goto } from '$app/navigation';

  function switchToKundenbereich() {
    goto('/dashboard/kundenbereich');
  }

  export let data;

</script>

<button type="button" on:click={switchToKundenbereich}>Profil bearbeiten</button>

<div class="dashboard-page">
</div>

<style>
.dashboard-page { 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  height: 100vh; 
  background-color: #a2e2d8; 
}
</style>
