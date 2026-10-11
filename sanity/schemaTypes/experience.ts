import {defineArrayMember, defineField, defineType} from 'sanity'

export const experienceType = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'location', type: 'string'}),
    defineField({
      name: 'startDate',
      type: 'date',
      options: {dateFormat: 'YYYY-MM'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      type: 'date',
      options: {dateFormat: 'YYYY-MM'},
      description: 'Leave empty if current.',
    }),
    defineField({
      name: 'highlights',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'technologies',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'technology'}]})],
    }),
  ],
  orderings: [
    {
      title: 'Most recent',
      name: 'startDateDesc',
      by: [{field: 'startDate', direction: 'desc'}],
    },
  ],
  preview: {select: {title: 'company', subtitle: 'title'}},
})