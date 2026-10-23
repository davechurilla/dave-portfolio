import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      type: 'string',
      description: 'Hero headline, e.g. "Senior Web Developer".',
    }),
    defineField({name: 'intro', type: 'text', rows: 3}),
    defineField({
      name: 'bio',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'profileImage',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string'})],
    }),
    defineField({name: 'resume', type: 'file', options: {accept: '.pdf'}}),
    defineField({name: 'contactEmail', type: 'string'}),
    defineField({
      name: 'socialLinks',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'platform', subtitle: 'url'}},
        }),
      ],
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default SEO description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {prepare: () => ({title: 'Site Settings'})},
})