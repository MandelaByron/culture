import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'

export const accessibleImage = defineType({
  name: 'accessibleImage',
  title: 'Accessible Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Upload an image. Use the hotspot to set the focal point.',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Describe the image for screen readers and next/image alt.',
      validation: (rule) =>
        rule.required().max(140).error('Alt text is required (max 140 characters).'),
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title || 'Image',
        media,
      }
    },
  },
})
