import type { Cookies } from '@sveltejs/kit';

export const load = ({ cookies }: { cookies: Cookies }) => {
  const flash = cookies.get('flash');

  if (flash) {
    cookies.delete('flash', { path: '/' }); // Cookie nur einmal anzeigen
  }

  return { flash };
};
