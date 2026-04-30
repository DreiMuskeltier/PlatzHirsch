<h1>KARTE</h1>
<p></p>
<script lang="ts">
 import { goto } from '$app/navigation';//Funktion für clientseitiges Routing, d.h. ohne Neuladen der Seite.
  function switchTofavoriten() {//Ruft goto('/Profil') auf → Benutzer wird clientseitig zurück zum Profil navigiert, ohne die ganze Seite neu zu laden
    goto('/favoriten');}
</script>
<div class="karte-page">

 
  <div class="auth-container">

    <img src="/insel.png" alt="Banner" />

    </div>
</div>
 <style>
.karte-page { display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #a1cfa4; }

</style>



<!--Bei einer Single-Page Application:
Es gibt nur eine HTML-Seite, die initial geladen wird
Beim Klicken auf Links oder Buttons wird nur der benötigte Inhalt dynamisch nachgeladen (z. B. via JS oder fetch)
Browser lädt nicht die ganze Seite neu, Header, Footer und Scripts bleiben erhalten
Vorteil: schnelle Navigation, gefühlt wie eine App-->