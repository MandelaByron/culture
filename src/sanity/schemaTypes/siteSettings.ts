import {CogIcon} from '@sanity/icons/Cog'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'Site name used in metadata and branding copy.',
      initialValue: 'Grain Archive',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short line shown in the footer and metadata.',
      initialValue: 'Words, images, and signals from the edge',
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      description: 'Links column in the footer (Home, Archive, About).',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerLink',
          title: 'Link',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Href',
              type: 'string',
              description: 'Internal path, e.g. /archive.',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'connectLinks',
      title: 'Connect Links',
      type: 'array',
      description: 'Connect column in the footer (Instagram, Threads, YouTube, Email).',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'connectLink',
          title: 'Connect Link',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Href',
              type: 'string',
              description: 'URL or mailto: link.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'external',
              title: 'External',
              type: 'boolean',
              description: 'Open in a new tab when true.',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
              external: 'external',
            },
            prepare({title, subtitle, external}) {
              return {
                title,
                subtitle: external ? `${subtitle} (external)` : subtitle,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Site Settings',
        subtitle: subtitle || 'Singleton',
      }
    },
  },
})
