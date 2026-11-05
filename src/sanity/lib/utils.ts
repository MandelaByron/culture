import type {SanityImageSource} from '@sanity/image-url'

import {urlFor} from '@/sanity/lib/image'

export function urlForOpenGraphImage(image: SanityImageSource | null | undefined) {
  if (!image) return undefined
  return urlFor(image).width(1200).height(627).fit('crop').url()
}

export function resolveHref(documentType?: string, slug?: string | null): string | undefined {
  switch (documentType) {
    case 'homePage':
      return '/'
    case 'aboutPage':
      return '/about'
    case 'story':
      return slug ? `/archive/${slug}` : undefined
    default:
      return undefined
  }
}
