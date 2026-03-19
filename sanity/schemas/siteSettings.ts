import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'cabinetName',
      title: 'Nom du cabinet',
      type: 'string',
      initialValue: 'Cabinet Laurent Bazile Géomètre-Expert',
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn (URL)',
      type: 'url',
    }),
    defineField({
      name: 'orderNumber',
      title: 'N° d\'inscription à l\'Ordre',
      type: 'string',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title par défaut',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description par défaut',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Image Open Graph par défaut',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Paramètres du site' }
    },
  },
})
