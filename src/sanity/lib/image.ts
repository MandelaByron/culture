import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'

import {dataset, projectId} from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({projectId, dataset})

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).auto('format')
}

export type HotspotLike = {
  x?: number
  y?: number
} | null

/** CSS object-position from a Sanity image hotspot (0–1 coords). */
export function hotspotToObjectPosition(hotspot?: HotspotLike): string | undefined {
  if (hotspot?.x == null || hotspot?.y == null) return undefined
  return `${hotspot.x * 100}% ${hotspot.y * 100}%`
}

/** Resolved image fields for next/image from an accessibleImage-shaped value. */
export type ResolvedImage = {
  src: string
  alt: string
  objectPosition?: string
  lqip?: string
}

type AccessibleImageLike = {
  alt?: string | null
  image?: (SanityImageSource & {hotspot?: HotspotLike}) | null
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
    objectPosition: hotspotToObjectPosition(
      'hotspot' in value.image ? value.image.hotspot : undefined,
    ),
  }
}

export function resolveDecorativeImage(
  value: SanityImageSource | null | undefined,
  width = 1600,
): string | null {
  if (!value) return null
  return urlFor(value).width(width).fit('max').url() ?? null
}
