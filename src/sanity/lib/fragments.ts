/** Shared GROQ projections for accessibleImage and decorative images. */

export const imageAssetFragment = /* groq */ `
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions
    }
  },
  hotspot,
  crop
`

export const accessibleImageFragment = /* groq */ `
  alt,
  image {
    ${imageAssetFragment}
  }
`

export const storyCardFragment = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  category,
  date,
  cardImage {
    ${accessibleImageFragment}
  }
`
