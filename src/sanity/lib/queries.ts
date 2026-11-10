import {defineQuery} from 'next-sanity'

import {
  accessibleImageFragment,
  categoryCardFragment,
  storyCardFragment,
} from './fragments'

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `{
  "home": *[_id == "homePage"][0]{
    heroVideoUrl,
    heroVideoPoster {
      ${accessibleImageFragment}
    },
    categoriesHeading,
    categories[]->{
      ${categoryCardFragment}
    },
    featuredStoriesHeading,
    featuredStories[]->{
      ${storyCardFragment}
    }
  },
  "allCategories": *[_type == "category"] | order(title asc) {
    ${categoryCardFragment}
  },
  "recentStories": *[_type == "story"] | order(date desc) [0...12] {
    ${storyCardFragment}
  }
}`)

export const ARCHIVE_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "story"] | order(date desc) {
    ${storyCardFragment}
  }
`)

export const STORY_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "story" && defined(slug.current)]{
    "slug": slug.current
  }
`)

export const STORY_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "story" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    "category": coalesce(category->title, category),
    date,
    intro,
    description,
    cardImage {
      ${accessibleImageFragment}
    },
    hero {
      ${accessibleImageFragment}
    },
    figures[] {
      _key,
      caption,
      credit,
      year,
      image {
        ${accessibleImageFragment}
      }
    }
  }
`)

export const ABOUT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "aboutPage"][0]{
    heading,
    marqueeItems[] {
      _key,
      rotate,
      image {
        ${accessibleImageFragment}
      }
    },
    whyHeading,
    whyText,
    contactHeading,
    contactImage {
      ${accessibleImageFragment}
    },
    contactIntro,
    contactOutro,
    contactEmail
  }
`)

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_id == "siteSettings"][0]{
    title,
    tagline,
    footerLinks[] {
      _key,
      label,
      href
    },
    connectLinks[] {
      _key,
      label,
      href,
      external
    }
  }
`)
