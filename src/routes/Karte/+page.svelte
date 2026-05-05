<h1>KARTE</h1>
<p></p>
<script lang="ts">
 import Map from '$lib/components/Map.svelte';
 import { goto } from '$app/navigation';//Funktion für clientseitiges Routing, d.h. ohne Neuladen der Seite.
  function switchTofavoriten() {//Ruft goto('/Profil') auf → Benutzer wird clientseitig zurück zum Profil navigiert, ohne die ganze Seite neu zu laden
    goto('/favoriten');}
</script>


<Map center={[53.497000, 10.018000]} zoom={12} />



 <div class="map">

 </div>

<style>
  .map {
    width: 100%;
    height: 400px; /* Muss explizit gesetzt sein! */
  }
</style>

<!--
<div class="karte-page">

 
  <div class="auth-container">

    <img src="/insel.png" alt="Banner" />
.karte-page { display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #a1cfa4; }-->

<!--Bei einer Single-Page Application:
Es gibt nur eine HTML-Seite, die initial geladen wird
Beim Klicken auf Links oder Buttons wird nur der benötigte Inhalt dynamisch nachgeladen (z. B. via JS oder fetch)
Browser lädt nicht die ganze Seite neu, Header, Footer und Scripts bleiben erhalten
Vorteil: schnelle Navigation, gefühlt wie eine App-->