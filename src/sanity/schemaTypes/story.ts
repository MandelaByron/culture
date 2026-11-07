import {BookIcon} from '@sanity/icons/Book'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const story = defineType({
  name: 'story',
  title: 'Story',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Story title shown on cards and the detail page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path segment for /archive/[slug].',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Editorial category for this story.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Publication date (YYYY-MM-DD).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Short summary for cards and search previews. Falls back to Intro if empty.',
    }),
    defineField({
      name: 'cardImage',
      title: 'Card Image',
      type: 'accessibleImage',
      description: 'Image used on home and archive story cards.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Image',
      type: 'accessibleImage',
      description: 'Detail page hero. Falls back to the card image if empty.',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 5,
      description: 'Opening paragraph on the story detail page.',
    }),
    defineField({
      name: 'figures',
      title: 'Figures',
      type: 'array',
      description:
        'Images shown after the intro. Captions use the story title and category/date.',
      of: [defineArrayMember({type: 'accessibleImage'})],
    }),
  ],
  orderings: [
    {
      title: 'Date, Newest',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      categoryTitle: 'category.title',
      date: 'date',
      media: 'cardImage.image',
    },
    prepare({title, categoryTitle, date, media}) {
      const subtitle = [categoryTitle, date].filter(Boolean).join(' · ')
      return {
        title: title || 'Untitled story',
        subtitle,
        media,
      }
    },
  },
})
