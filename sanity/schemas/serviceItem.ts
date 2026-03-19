import { defineType, defineField, defineArrayMember } from 'sanity'

export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Prestation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icône Lucide',
      type: 'string',
      description: 'Nom de l\'icône Lucide (ex: Landmark, Mountain, Building2, PenTool, Scan, Ruler)',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Description courte (homepage)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(150),
    }),
    defineField({
      name: 'longDescription',
      title: 'Description longue (page prestations)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
    },
    prepare({ title, order }) {
      return {
        title,
        subtitle: `Position ${order}`,
      }
    },
  },
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
