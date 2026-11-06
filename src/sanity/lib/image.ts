import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'

import {dataset, projectId} from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({projectId, dataset})

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).auto('format')
}

/** Resolved image fields for next/image from an accessibleImage-shaped value. */
export type ResolvedImage = {
  src: string
  alt: string

}

type AccessibleImageLike = {
  alt: string | null
  image: (SanityImageSource | null)
} | null

export function resolveAccessibleImage(
  value: AccessibleImageLike,
  width = 1600,
): ResolvedImage | null {
  if (!value?.image) return null

  const src = urlFor(value.image).width(width).fit('max').url()
  if (!src) return null

  return {
    src,
    alt: value.alt ?? '',
  }
}

export function resolveDecorativeImage(
  value: SanityImageSource | null | undefined,
  width = 1600,
): string | null {
  if (!value) return null
  return urlFor(value).width(width).fit('max').url() ?? null
}
