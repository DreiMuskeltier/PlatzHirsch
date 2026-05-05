<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Map as LeafletMap } from 'leaflet';

  export let center: [number, number] = [51.505, -0.09];
  export let zoom: number = 13;

  let mapElement: HTMLDivElement;
  let map: LeafletMap;

  onMount(async () => {
    // Leaflet nur im Browser laden (kein SSR)
    const L = await import('leaflet');

    // Standard-Icon-Pfad korrigieren (Webpack/Vite Bug)
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      
        iconRetinaUrl: '/images/marker-icon-2x.png', //der blaue Marker
        iconUrl:       '/images/marker-icon.png',//derselbe Marker für Retina-Displays (doppelte Auflösung)
        shadowUrl:     '/images/marker-shadow.png', //der Schatten unter dem Marker
});
    

    

//marker-shadow.png – der Schatten unter dem Marker
    map = L.map(mapElement).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Beispiel-Marker
    L.marker(center).addTo(map).bindPopup('Hier bin ich!').openPopup();
  });

  onDestroy(() => {
    if (map) map.remove();
  });
</script>

<div bind:this={mapElement} class="map"></div>

<style>
  .map {
    width: 100%;
    height: 400px;
  }
</style>