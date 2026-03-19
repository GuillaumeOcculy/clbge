import { defineType, defineField } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Page d\'accueil',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Titre du hero',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Sous-titre du hero',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroCtaPrimary',
      title: 'CTA principal (texte du bouton)',
      type: 'string',
      initialValue: 'Prendre rendez-vous',
    }),
    defineField({
      name: 'heroCtaSecondary',
      title: 'CTA secondaire (texte du bouton)',
      type: 'string',
      initialValue: 'Diagnostic gratuit',
    }),
    defineField({
      name: 'trustBarItems',
      title: 'Points de confiance (Trust Bar)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Texte',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'text' },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'diagnosticTitle',
      title: 'Titre section diagnostic',
      type: 'string',
    }),
    defineField({
      name: 'diagnosticDescription',
      title: 'Description section diagnostic',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaBannerTitle',
      title: 'Titre bandeau CTA',
      type: 'string',
    }),
    defineField({
      name: 'ctaBannerSubtitle',
      title: 'Sous-titre bandeau CTA',
      type: 'string',
    }),
    defineField({
      name: 'ctaBannerButton',
      title: 'Texte bouton bandeau CTA',
      type: 'string',
      initialValue: 'Prendre rendez-vous',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Page d\'accueil' }
    },
  },
})
