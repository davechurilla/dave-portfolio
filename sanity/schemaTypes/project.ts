import {defineArrayMember, defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      description: 'One or two sentences shown on cards and in search results.',
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Websites', value: 'websites'},
          {title: 'CRM Emails', value: 'crm-emails'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'client', title: 'Client / Employer', type: 'string'}),
    defineField({name: 'role', type: 'string'}),
    defineField({
      name: 'year',
      type: 'number',
      validation: (rule) => rule.integer().min(1995).max(2100),
    }),
    defineField({
      name: 'confidential',
      title: 'Confidential / NDA',
      type: 'boolean',
      description: 'Shows a note that details are limited.',
      initialValue: false,
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'caption', type: 'string'}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'technologies',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'technology'}]})],
    }),
    defineField({
      name: 'outcomes',
      type: 'array',
      description: 'Short, concrete results or highlights.',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'body',
      title: 'Case study',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'caption', type: 'string'}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'links',
      type: 'array',
      description: 'Optional. Leave empty for sunset or confidential work.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'link',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        }),
      ],
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      description: 'Show on the home page.',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  orderings: [
    {
      title: 'Sort order',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'client', media: 'coverImage'},
  },
})