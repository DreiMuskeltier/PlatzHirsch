<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Map as LeafletMap } from 'leaflet';

  export let center: [number, number] = [53.497, 10.018];
  export let zoom: number = 13;

  let mapElement: HTMLDivElement;
  let map: LeafletMap;

  onMount(async () => {
    const L = await import('leaflet');

    const container = mapElement as any;
    if (container._leaflet_id) {
      container._leaflet_id = null;
    }

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/marker-icon-2x.png',
      iconUrl: '/images/marker-icon.png',
      shadowUrl: '/images/marker-shadow.png',
    });

    // Nur EINE Initialisierung ✅
    map = L.map(mapElement, {
      maxBounds: [[53.46, 9.96], [53.54, 10.08]],
      maxBoundsViscosity: 1.0,
      minZoom: 12
    }).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

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