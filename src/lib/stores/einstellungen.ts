import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Gespeicherte Werte aus localStorage laden
const gespeichert = browser ? JSON.parse(localStorage.getItem('einstellungen') ?? '{}') : {};

export const einstellungen = writable({
  darkmode: gespeichert.darkmode ?? false,
  schriftgroesse: gespeichert.schriftgroesse ?? 16
});

// Bei jeder Änderung in localStorage speichern
if (browser) {
  einstellungen.subscribe(wert => {
    localStorage.setItem('einstellungen', JSON.stringify(wert));
  });
}