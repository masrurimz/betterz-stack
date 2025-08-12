import 'dotenv/config';
import { SQL } from 'bun';
import { drizzle } from 'drizzle-orm/bun-sql';

// biome-ignore lint/performance/noNamespaceImport: Required for Drizzle schema configuration
import * as schema from './schema';

// Validate required environment variable
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

// Create Bun SQL client
export const client = new SQL(process.env.DATABASE_URL);

// Create Drizzle instance
export const db = drizzle({ client, schema });
