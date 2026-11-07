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
  /** Intrinsic pixel width from Sanity asset metadata — use as next/image `width` prop. */
  naturalWidth: number | null
  /** Intrinsic pixel height from Sanity asset metadata — use as next/image `height` prop. */
  naturalHeight: number | null
  /** Optional object-position CSS value derived from hotspot (e.g. "50% 50%") */
  objectPosition?: string
}

type AccessibleImageLike = {
  alt: string | null
  image: (SanityImageSource & {
    asset?: {
      metadata?: {
        dimensions?: {width?: number | null; height?: number | null} | null
      } | null
    } | null
    hotspot?: {x?: number | null; y?: number | null} | null
  }) | null
} | null

export function resolveAccessibleImage(
  value: AccessibleImageLike | undefined,
  width = 1600,
): ResolvedImage | null {
  if (!value?.image) return null

  const src = urlFor(value.image).width(width).fit('max').url()
  if (!src) return null

  const imgObj = value.image as {
    asset?: {metadata?: {dimensions?: {width?: number | null; height?: number | null} | null} | null} | null
    hotspot?: {x?: number | null; y?: number | null} | null
  }
  const dims = imgObj?.asset?.metadata?.dimensions
  const hotspot = imgObj?.hotspot
  const objectPosition =
    typeof hotspot?.x === 'number' && typeof hotspot?.y === 'number'
      ? `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`
      : undefined

  return {
    src,
    alt: value.alt ?? '',
    naturalWidth: dims?.width ?? null,
    naturalHeight: dims?.height ?? null,
    objectPosition,
  }
}

export function resolveDecorativeImage(
  value: SanityImageSource | null | undefined,
  width = 1600,
): string | null {
  if (!value) return null
  return urlFor(value).width(width).fit('max').url() ?? null
}
