import { PrismaClient } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';
const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.kunde.findMany();
  return new Response(JSON.stringify(users), {
    headers: { "Content-Type": "application/json" }
  });
}

export async function POST({ request }: RequestEvent) {
  const data = await request.json();
  const user = await prisma.kunde.create({
    data: {
      name: data.name,
      email: data.email
    }
  });
  return new Response(JSON.stringify(user));
}