import {TagIcon} from '@sanity/icons/Tag'
import {defineField, defineType} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Category name, e.g. Photo, Essay, Film, Culture.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path segment (e.g. photo, essay, film, culture).',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description:
        'Short subtitle shown on the category card (e.g. "Still frames that hold entire worlds").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'accessibleImage',
      description: 'Card image shown on the "What interests you?" section.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image.image',
    },
  },
})
