<h1>Willkommen im Kundenbereich!</h1>
<p>Du kannst hier deine Bestellungen einsehen und deine Daten ändern!</p>

<script lang="ts">
  import { page } from '$app/stores';//Zugriff auf SvelteKit Stores wie page (aktuelle URL, Parameter etc.).
  import { goto } from '$app/navigation';//Funktion für clientseitiges Routing, d.h. ohne Neuladen der Seite.

 // $: mode = $page.url.searchParams.get('mode') ?? 'kundenbereich';
  //$: iskundenbereich = mode === 'kundenbereich';




function switchTodashboard() {//Ruft goto('/dashboard') auf → Benutzer wird clientseitig zurück zum Dashboard navigiert, ohne die ganze Seite neu zu laden
    goto('/dashboard');}




//Prop data:
//Wird von der Server-Seite (load-Funktion) bereitgestellt.
//Enthält die Daten des aktuell eingeloggten Kunden (kunde).
//Diese Daten werden später in das Formular eingefügt
export let data: { kunde: { name: string; fname: string; email: string; street: string; hausnummer: number; plz: string; ort: string } }; //; dbirth: string
</script>



<button type="button" on:click={switchTodashboard}>Zurück zum Dashboard</button>




 <!--//Formular zur Bearbeitung des Profils >-->
<h2>Profil bearbeiten</h2>
<form method="POST"> <!--Da method="POST" gesetzt ist, wird das Formular automatisch an die Server-Action (actions.default) geschickt-->
  <input name="name" placeholder="Name" value={data.kunde.name} required /> <!--value={data.kunde.name} usw. → Felder werden mit den aktuellen Daten aus der Datenbank gefüllt (vom Server bereitgestellt)-->
  <input name="fname" placeholder="Vorname" value={data.kunde.fname} required />
  <input name="email" placeholder="Email" type="email" value={data.kunde.email} required />
  <input name="street" placeholder="Straße" value={data.kunde.street} required />
  <input name="hausnummer" placeholder="Hausnummer" type="number" value={data.kunde.hausnummer} required />
  <input name="plz" placeholder="PLZ" value={data.kunde.plz} required />
  <input name="ort" placeholder="Ort" value={data.kunde.ort} required />
  <!-- <input name="dbirth" placeholder="Geburtsdatum" type="date" value={data.kunde.dbirth.split('T')[0]} required />-->
  <button type="submit">Speichern</button> <!--Form-Daten gehen an die Server-Action.
actions.default prüft Session, validiert Felder und updated die Datenbank.-->
</form>

 <div class="kundenbereich-page">

 </div>

 <style>
.kundenbereich-page { display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #af6fa2; }

</style>
