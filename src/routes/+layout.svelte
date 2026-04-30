<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
  import Menu from '$lib/components/Menu.svelte';
  	
  	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

	export let data: { flash?: string };
	let showConfirmation = false;

	//let menuOffen = false;

	// Navigation
	function goToHome() { goto('/'); }
	function goTokarte() { goto('/Karte'); }
	function goToprofil() { goto('/profil'); }
  function goTofavoriten() { goto('/Favoriten'); }
	//function goTologin() { goto('/login'); }
	//function goToregistration() { goto('/login?mode=register'); }
 
</script>



{#if data.flash}
  <div class="flash-banner">{data.flash}</div>
{/if}

<nav>
  
   <button on:click={goToHome}>Home 🏠</button>
  <button on:click={goTokarte}>Karte 🧭</button>
  <button on:click={goTofavoriten}>Favoriten ♥️</button>
  <button on:click={goToprofil}>Profil 👤</button>
 <!-- <button on:click={goTologin}>Login</button>-->
<Menu />
</nav>


<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<slot />



<!-- Footer / Impressum -->
<footer class="footer-fixed">
  <p>© 2026 Mein Unternehmen. Alle Rechte vorbehalten. | <a href="/impressum">Impressum</a></p>
</footer>


<style>

    nav {
    display: flex;
    
    gap: 1rem;
    margin-bottom: 1rem;
  }

  nav button {
    background: #cdf4d3;
    border: none;
    color: #149753;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
  }

  nav button:hover {
    background-color: #84ce8e;
  }


 .flash-banner {
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem;
  border: 1px solid #15572455;
}

 


  


.footer-fixed {
  position: fixed;
  bottom: 0; 
  left: 0;
  right: 0;
  height: 3rem;
  text-align: center;
  background-color: #f5f5f5;
  line-height: 3rem;
  border-top: 1px solid #ddd;
  font-size: 0.9rem;
  z-index: 999; /* unter dem Warenkorb, wenn nötig anpassen */
}

</style>


