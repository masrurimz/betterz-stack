import '@/polyfill'

import { createServerFileRoute } from '@tanstack/react-start/server'
import { auth } from '@/lib/auth'

async function handle({ request }: { request: Request }) {
  return auth.handler(request)
}

export const ServerRoute = createServerFileRoute('/api/auth/$').methods({
  HEAD: handle,
  GET: handle,
  POST: handle,
  PUT: handle,
  PATCH: handle,
  DELETE: handle,
})