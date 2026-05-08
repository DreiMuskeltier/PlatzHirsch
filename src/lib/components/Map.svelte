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

    // Alte Marker entfernen bevor neue gesetzt werden
    markers.forEach(m => m.remove());
    markers = [];

    orte.forEach(ort => {
      const m = L.marker([ort.lat, ort.lng])
        .addTo(map)
        .bindPopup(`
          <b>${ort.name}</b><br>
          ${ort.beschreibung ?? ''}
        `);
      markers.push(m);
    });
  }

  onMount(async () => {
    const L = await import('leaflet');

    // Beim Entwickeln lädt SvelteKit die Komponente manchmal neu (HMR), das <div> bleibt aber drin
    // Ohne Reset -> grauer Bildschirm
    const container = mapElement as any;
    if (container._leaflet_id) {
      container._leaflet_id = null;
    }

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
    margin: 0 auto;
  }
</style>