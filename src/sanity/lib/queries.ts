import {defineQuery} from 'next-sanity'

import {accessibleImageFragment, imageAssetFragment, storyCardFragment} from './fragments'

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `{
  "home": *[_id == "homePage"][0]{
    heroImage {
      ${accessibleImageFragment}
    },
    featuredStory->{
      ${storyCardFragment}
    },
    featuredBackground {
      ${imageAssetFragment}
    },
    beautifulPeople {
      heading,
      photos[] {
        _key,
        wide,
        image {
          ${accessibleImageFragment}
        }
      }
    },
    imageBreak {
      ${accessibleImageFragment}
    }
  },
  "recentStories": *[_type == "story"] | order(date desc) [0...4] {
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
    category,
    date,
    intro,
    cardImage {
      ${accessibleImageFragment}
    },
    hero {
      ${accessibleImageFragment}
    },
    figures[] {
      _key,
      ${accessibleImageFragment}
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
