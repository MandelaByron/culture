import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'accessibleImage',
      description: 'Full-screen hero. Focal point comes from the image hotspot.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredStory',
      title: 'Featured Story',
      type: 'reference',
      description: 'Story highlighted in the Featured Story section.',
      to: [{type: 'story'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredBackground',
      title: 'Featured Background',
      type: 'image',
      description: 'Decorative textured background for the Featured Story section.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'beautifulPeople',
      title: 'Beautiful People',
      type: 'object',
      description: 'Photo grid section on the home page.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'Section heading.',
          initialValue: 'Beautiful People',
        }),
        defineField({
          name: 'photos',
          title: 'Photos',
          type: 'array',
          description: 'Grid photos. Mark one as wide to span two columns.',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'beautifulPeoplePhoto',
              title: 'Photo',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'accessibleImage',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'wide',
                  title: 'Wide',
                  type: 'boolean',
                  description: 'When true, this tile spans two columns.',
                  initialValue: false,
                }),
              ],
              preview: {
                select: {
                  title: 'image.alt',
                  wide: 'wide',
                  media: 'image.image',
                },
                prepare({title, wide, media}) {
                  return {
                    title: title || 'Photo',
                    subtitle: wide ? 'Wide tile' : 'Square tile',
                    media,
                  }
                },
              },
            }),
          ],
          validation: (rule) =>
            rule
              .required()
              .min(5)
              .max(6)
              .error('Beautiful People needs 5 to 6 photos.'),
        }),
      ],
    }),
    defineField({
      name: 'imageBreak',
      title: 'Image Break',
      type: 'accessibleImage',
      description: 'Full-width image before the footer.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
        subtitle: 'Singleton',
      }
    },
  },
})
