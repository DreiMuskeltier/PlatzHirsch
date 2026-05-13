<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Map as LeafletMap, Marker } from 'leaflet';

  export let center: [number, number] = [53.497, 10.018];
  export let zoom: number = 13;

  let mapElement: HTMLDivElement;
  let map: LeafletMap;
  let markers: Marker[] = [];

  // Orte von der API laden und als Marker anzeigen
  async function ladeOrte() {
    const res = await fetch('/api/ort');
    const orte = await res.json();
    zeigeMarker(orte);
  }

  async function zeigeMarker(orte: any[]) {
  const L = await import('leaflet');
  markers.forEach(m => m.remove());
  markers = [];

  orte.forEach(ort => {
    const popup = L.popup({ className: 'mein-popup' });
    

    const container = document.createElement('div');
    container.innerHTML = `
     
      <b>${ort.name}</b><br>
      ${ort.beschreibung ?? ''}<br>
      <button 
        id="fav-${ort.id}" 
        style="margin-top:6px; cursor:pointer; background:none; border:none; font-size:1.4rem;pointer-events: all; color: var(--text)"
        title="Favorit">
        ☆
      </button>
    `;

    // Stern-Button Klick-Handler
    container.querySelector(`#fav-${ort.id}`)?.addEventListener('click', async () => {
      const btn = container.querySelector(`#fav-${ort.id}`) as HTMLButtonElement;
      const res = await fetch('/Favoriten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ortId: ort.id })
      });
      const data = await res.json();
      btn.textContent = data.action === 'added' ? '★' : '☆';
    });

    popup.setContent(container);
    const m = L.marker([ort.lat, ort.lng]).addTo(map).bindPopup(popup);
    markers.push(m);
  });
}

  onMount(async () => {
    const L = await import('leaflet');

    // Beim Entwickeln lädt SvelteKit die Komponente manchmal neu (HMR), das <div> bleibt aber drin
    // Ohne Reset -> grauer Bildschirm
    const container = mapElement as any;
    if (container && container._leaflet_id) {
      container._leaflet_id = null;
    }

    if (!mapElement) return;

    // Vite zerstört die internen Bildpfade von Leaflet
    // --> Marker-Icons manuell auf lokale Dateien in /static/images/ setzen
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/marker-icon-2x.png',
      iconUrl: '/images/marker-icon.png',
      shadowUrl: '/images/marker-shadow.png',
    });

    const centerLat = 53.497;
    const centerLng = 10.018;
    const radius = 0.10; // größer = mehr Spielraum

    // Karte initialisieren
    map = L.map(mapElement, {
      maxBounds: [
        [centerLat - radius, centerLng - radius],
        [centerLat + radius, centerLng + radius]
      ],
      maxBoundsViscosity: 0.5,
      minZoom: 12
    }).setView([centerLat, centerLng], 13);

    // Kartenbilder von OpenStreetMap laden
    // {s} → Subdomains (a/b/c) für paralleles Laden
    // {z} → Zoomstufe
    // {x}/{y} → Kachelposition
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Orte aus der Datenbank laden und anzeigen
    await ladeOrte();
  });

  // Wenn die Komponente entfernt wird, Karte sauber aus dem DOM löschen
  // --> Verhindert Speicherlecks
  onDestroy(() => {
    if (map) map.remove();
  });
</script>

<!-- bind:this verbindet das <div> mit der mapElement Variable -->
<!-- Leaflet bekommt so Zugriff auf das DOM-Element -->
<div bind:this={mapElement} class="map"></div>

<style>
  .map {
    width: 100%;
    height: 100vh;
    max-width: 100%;
    max-height: 100%;
  }


:global(.mein-popup .leaflet-popup-content-wrapper) {
  background: var(--bg);
  border-radius: 8px;
  border: 20px solid var(--bg);
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

:global(.mein-popup .leaflet-popup-tip) {
  background: var(--bg);
}

:global(.mein-popup .leaflet-popup-content) {
  color: var(--text);
  margin: 0;
  padding: 0;
}


</style>