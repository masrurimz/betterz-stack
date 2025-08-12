/**
 * Utility functions for database schema
 */

/**
 * Generate UUID v7 with fallback for test environments
 * Bun's randomUUIDv7() is preferred for better performance and ordering
 */
export function generateUUID(): string {
  // Handle test environment where Bun global might not be available
  if (typeof Bun !== 'undefined' && Bun.randomUUIDv7) {
    return Bun.randomUUIDv7();
  }
  // Fallback for test environment
  return crypto.randomUUID();
}

/**
 * UUID default function for Drizzle schema
 */
export const uuidDefault = () => generateUUID();
