import { writable } from 'svelte/store';

export const gesuchterOrt = writable<{
  id: string;
  lat: number;
  lng: number;
  name: string;
} | null>(null);

//writable erstellt einen Svelte-Store, der einen Wert speichert und es ermöglicht, diesen Wert zu aktualisieren. 
// In diesem Fall speichert der Store ein Objekt mit den Eigenschaften id, lat, lng und name, oder null, wenn kein Ort ausgewählt ist.
//