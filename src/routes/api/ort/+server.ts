import { json } from '@sveltejs/kit';
import { ortRepository } from '$lib/server/repositories/ortRepository';

export async function GET() {
  const orte = await ortRepository.findAll();
  return json(orte);
}