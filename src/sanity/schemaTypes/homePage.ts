import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Video URL',
      type: 'url',
      description:
        'Direct URL to the hero video file (e.g. MP4, WebM hosted on Cloudinary, Sanity file asset, or S3).',
    }),
    defineField({
      name: 'heroVideoPoster',
      title: 'Hero Video Poster',
      type: 'accessibleImage',
      description: 'Optional placeholder image displayed while the hero video loads.',
    }),
    defineField({
      name: 'categoriesHeading',
      title: 'Categories Section Heading',
      type: 'string',
      description: 'Heading above the category cards. Defaults to "What interests you?".',
      initialValue: 'What interests you?',
    }),
    defineField({
      name: 'categories',
      title: 'Categories to Display',
      type: 'array',
      description:
        'Curated list of categories shown on the home page. If empty, all published categories will be shown.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'category'}]})],
    }),
    defineField({
      name: 'featuredStoriesHeading',
      title: 'Featured Stories Heading',
      type: 'string',
      description: 'Heading above the featured stories grid. Defaults to "Featured Stories".',
      initialValue: 'Featured Stories',
    }),
    defineField({
      name: 'featuredStories',
      title: 'Featured Stories',
      type: 'array',
      description:
        'Selected stories to feature on the home page (up to 12). If empty, the newest stories are shown.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'story'}]})],
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
