// Configuration Sanity Studio — CLBGE
//
// Webhook Sanity → Vercel (rebuild automatique) :
// 1. Aller sur manage.sanity.io → Settings → Webhooks → Add webhook
// 2. URL : https://api.vercel.com/v1/integrations/deploy/... (Deploy Hook Vercel)
// 3. Trigger on : Create, Update, Delete
// 4. Filter : aucun (rebuild sur tout changement de contenu)

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { schemaTypes } from './sanity/schemas'
import { dataset, projectId } from './sanity/env'

export default defineConfig({
  name: 'clbge-studio',
  title: 'CLBGE — Cabinet Laurent Bazile',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
