/**
 * Utility functions for database schema
 */

/**
 * Generate UUID v7 with fallback for test environments
 * Bun's randomUUIDv7() is preferred for better performance and ordering
 */
export function generateUUID(): string {
  // Handle test environment where Bun global might not be available
  // biome-ignore lint/correctness/noUndeclaredVariables: Bun is a global in Bun runtime
  if (typeof Bun !== 'undefined' && Bun.randomUUIDv7) {
    // biome-ignore lint/correctness/noUndeclaredVariables: Bun is a global in Bun runtime
    return Bun.randomUUIDv7();
  }
  // Fallback for test environment
  return crypto.randomUUID();
}

/**
 * UUID default function for Drizzle schema
 */
export const uuidDefault = () => generateUUID();
