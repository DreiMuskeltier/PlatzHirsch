// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
//event.locals ist in SvelteKit standardmäßig ein leeres Objekt — 
// TypeScript weiß nicht, dass du dort einen user speicherst. Ohne die Typdefinition bekommst du überall einen Fehler
declare global {
	namespace App {
		// interface Error {}
		 interface Locals {user: import('@prisma/client').User | null;}
		 //Weiß TypeScript ab jetzt: locals.user existiert und ist entweder ein User aus der Datenbank oder null. 
		 // Das gibt dir auch Autocomplete wenn du in anderen Dateien auf locals.user zugreifst
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		
	}
}

export {};
