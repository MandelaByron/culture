import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Page title at the top of About.',
      initialValue: 'About',
    }),
    defineField({
      name: 'marqueeItems',
      title: 'Marquee Items',
      type: 'array',
      description: 'Cutout images that scroll in the marquee (transparent PNG or WebP).',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'marqueeItem',
          title: 'Marquee Item',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'accessibleImage',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'rotate',
              title: 'Rotate',
              type: 'number',
              description: 'Rotation in degrees for a slight tilt.',
              initialValue: 0,
              validation: (rule) =>
                rule.min(-15).max(15).error('Rotation must be between -15 and 15 degrees.'),
            }),
          ],
          preview: {
            select: {
              title: 'image.alt',
              rotate: 'rotate',
              media: 'image.image',
            },
            prepare({title, rotate, media}) {
              return {
                title: title || 'Marquee item',
                subtitle: `Rotate ${rotate ?? 0}°`,
                media,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'whyHeading',
      title: 'Why Heading',
      type: 'string',
      description: 'Heading for the mission / why section.',
      initialValue: 'Why this exists',
    }),
    defineField({
      name: 'whyText',
      title: 'Why Text',
      type: 'text',
      description: 'Body copy for the why section.',
      rows: 6,
    }),
    defineField({
      name: 'contactHeading',
      title: 'Contact Heading',
      type: 'string',
      description: 'Heading for the contact section.',
      initialValue: 'Contact',
    }),
    defineField({
      name: 'contactImage',
      title: 'Contact Image',
      type: 'accessibleImage',
      description: 'Image beside the contact copy.',
    }),
    defineField({
      name: 'contactIntro',
      title: 'Contact Intro',
      type: 'string',
      description: 'Opening line, e.g. “Got a dusty VHS…”',
    }),
    defineField({
      name: 'contactOutro',
      title: 'Contact Outro',
      type: 'string',
      description: 'Sentence before the email, e.g. “Send recs… to”',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Public contact email address.',
      validation: (rule) =>
        rule.email().error('Enter a valid email address.'),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'contactImage.image',
    },
    prepare({title, media}) {
      return {
        title: title || 'About Page',
        subtitle: 'Singleton',
        media,
      }
    },
  },
})
