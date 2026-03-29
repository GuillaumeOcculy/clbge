import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

export const { GET } = client
  ? defineEnableDraftMode({
      client: client.withConfig({ token }),
    })
  : { GET: () => new Response('Sanity not configured', { status: 503 }) }
