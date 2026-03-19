import { defineType, defineField } from 'sanity'

export const missionStep = defineType({
  name: 'missionStep',
  title: 'Étape de mission',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stepNumber',
      title: 'Numéro d\'étape',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      stepNumber: 'stepNumber',
    },
    prepare({ title, stepNumber }) {
      return {
        title: `${stepNumber}. ${title}`,
      }
    },
  },
  orderings: [
    {
      title: 'Numéro d\'étape',
      name: 'stepNumberAsc',
      by: [{ field: 'stepNumber', direction: 'asc' }],
    },
  ],
})
