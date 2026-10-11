import {defineField, defineType} from 'sanity'

export const technologyType = defineType({
  name: 'technology',
  title: 'Technology',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: [
          {title: 'Languages', value: 'languages'},
          {title: 'Frameworks & Libraries', value: 'frameworks'},
          {title: 'Styling', value: 'styling'},
          {title: 'CMS & Platforms', value: 'platforms'},
          {title: 'Email & Marketing', value: 'email'},
          {title: 'Tooling & Process', value: 'tooling'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {select: {title: 'name', subtitle: 'category'}},
})