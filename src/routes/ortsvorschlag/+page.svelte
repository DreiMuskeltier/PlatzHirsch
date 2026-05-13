<script lang="ts">
  let name = '';
  let beschreibung = '';
  let lat = '';
  let lng = '';

  let message = '';
  let error = '';

  async function submit() {
    message = '';
    error = '';

    try {
      const res = await fetch('/api/ortvorschlag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          beschreibung,
          lat: Number(lat),
          lng: Number(lng),
          userId: 'cmoscp9nz0002qj8g9bwsbdxj' // temporär hardcoded
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Unbekannter Fehler');
      }

      message = 'Ort erfolgreich vorgeschlagen!';
      
      // optional reset
      name = '';
      beschreibung = '';
      lat = '';
      lng = '';

    } catch (e: any) {
      error = e.message;
    }
  }
</script>

<h1>Ort vorschlagen</h1>

<form on:submit|preventDefault={submit}>
  <div>
    <label for="name">Name:</label>
    <input id="name" bind:value={name} required />
  </div>

  <div>
    <label for="beschreibung">Beschreibung:</label>
    <textarea id="beschreibung" bind:value={beschreibung}></textarea>
  </div>

  <div>
    <label for="lat">Latitude:</label>
    <input id="lat" bind:value={lat} type="number" step="any" required />
  </div>

  <div>
    <label for="lng">Longitude:</label>
    <input id="lng" bind:value={lng} type="number" step="any" required />
  </div>

  <button type="submit">Absenden</button>
</form>

{#if message}
  <p style="color: green">{message}</p>
{/if}

{#if error}
  <p style="color: red">{error}</p>
{/if}