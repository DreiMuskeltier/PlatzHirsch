<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Map as LeafletMap } from 'leaflet';

  export let center: [number, number] = [53.497, 10.018];
  export let zoom: number = 13;

  let mapElement: HTMLDivElement;
  let map: LeafletMap;

  onMount(async () => {
    const L = await import('leaflet');



    //Beim Entwickeln lädt SvelteKit die Komponente manchmal neu (HMR), das <div> bleibt aber drin
    // Ohne  Reset -> grauer Bildschirm
    //Hot Module Replacement: aktualisiert nur den geänderten Teil der Seite – ohne die ganze Seite neu zu laden:
    const container = mapElement as any;
    if (container._leaflet_id) {
      container._leaflet_id = null;
    }



    //Vite (der Build-Tool von SvelteKit) zerstört die internen Bildpfade von Leaflet
    // -->  werden die Marker-Icons manuell auf unsere lokalen Dateien in /static/images/ gesetzt
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/marker-icon-2x.png',
      iconUrl: '/images/marker-icon.png',
      shadowUrl: '/images/marker-shadow.png',
    });

   
const centerLat = 53.497;
const centerLng = 10.018;
const radius = 0.10; // größer = mehr Spielraum

map = L.map(mapElement, {  // Initialisierung 
  maxBounds: [
    [centerLat - radius, centerLng - radius],
    [centerLat + radius, centerLng + radius]
  ],
  maxBoundsViscosity: 0.5,
  minZoom: 12
})
.setView([centerLat, centerLng], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker(center).addTo(map).bindPopup('Hier bin ich!').openPopup();
  });

//Lädt die eigentlichen Kartenbilder von OpenStreetMap
// {s} → Subdomains (a/b/c) für paralleles Laden
// {z} → Zoomstufe
// {x}/{y} → Kachelposition




//Wenn die Komponente entfernt wird, wird die Karte sauber aus dem DOM (Document Object Model) gelöscht - > Verhindert Speicherlecks
  onDestroy(() => {
    if (map) map.remove();
  });
</script>


<div bind:this={mapElement} class="map"></div> <!-- verbindet das <div> mit der mapElement Variable, Leaflet bekommt so Zugriff auf das DOM-Element-->

<style>
  .map {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
  }
</style>