// Configuration Sanity Studio — CLBGE
//
// Webhook Sanity → Vercel (rebuild automatique) :
// 1. Aller sur manage.sanity.io → Settings → Webhooks → Add webhook
// 2. URL : https://api.vercel.com/v1/integrations/deploy/... (Deploy Hook Vercel)
// 3. Trigger on : Create, Update, Delete
// 4. Filter : aucun (rebuild sur tout changement de contenu)

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { defineLocations, presentationTool } from 'sanity/presentation'
import {
  BookIcon,
  DocumentsIcon,
  CogIcon,
  ComponentIcon,
} from '@sanity/icons'

import { schemaTypes } from './sanity/schemas'
import { dataset, projectId } from './sanity/env'

export default defineConfig({
  name: 'clbge-studio',
  title: 'CLBGE — Cabinet Laurent Bazile',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem()
              .title('Articles de blog')
              .icon(BookIcon)
              .child(
                S.documentTypeList('blogPost')
                  .title('Articles de blog')
                  .defaultOrdering([
                    { field: 'publishedAt', direction: 'desc' },
                  ])
              ),
            S.divider(),
            S.listItem()
              .title('Pages')
              .icon(DocumentsIcon)
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    S.listItem()
                      .title('Accueil')
                      .child(
                        S.document()
                          .schemaType('homePage')
                          .documentId('homePage')
                      ),
                    S.listItem()
                      .title('À propos')
                      .child(
                        S.document()
                          .schemaType('aboutPage')
                          .documentId('aboutPage')
                      ),
                    S.listItem()
                      .title('Contact')
                      .child(
                        S.document()
                          .schemaType('contactPage')
                          .documentId('contactPage')
                      ),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title('Services & Contenu')
              .icon(ComponentIcon)
              .child(
                S.list()
                  .title('Services & Contenu')
                  .items([
                    S.documentTypeListItem('serviceItem').title('Prestations'),
                    S.documentTypeListItem('missionStep').title(
                      'Étapes de mission'
                    ),
                    S.documentTypeListItem('technology').title('Technologies'),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title('Configuration')
              .icon(CogIcon)
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        locations: {
          blogPost: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Article',
                  href: `/blog/${doc?.slug}`,
                },
                { title: 'Blog', href: '/blog' },
              ],
            }),
          }),
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
