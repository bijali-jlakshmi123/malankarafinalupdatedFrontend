import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  // Prisma v7.4.0 has a TS typing issue where `adapter` can be typed as `never`.
  // Runtime behavior is correct; this cast keeps the project type-safe elsewhere.
  return new PrismaClient({
    adapter,
    log: ['error', 'warn'],
  } as unknown as ConstructorParameters<typeof PrismaClient>[0]);
}

export const prisma =
  global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

