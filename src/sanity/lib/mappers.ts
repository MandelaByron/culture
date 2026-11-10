import type {StoryCardItem} from '@/components/story-cards'
import type {CategoryCard} from '@/components/home-categories'
import type {BeautifulPeoplePhoto} from '@/components/beautiful_people'
import type {FeaturedStoryData} from '@/components/featurestory'
import type {AboutMarqueeItem} from '@/components/about-marquee'
import type {FooterLink} from '@/components/footer'
import {resolveAccessibleImage, resolveDecorativeImage} from './image'

type StoryCardSource = {
  slug?: string | null
  title?: string | null
  category?: string | null
  date?: string | null
  description?: string | null
  cardImage?: Parameters<typeof resolveAccessibleImage>[0]
}

export function toStoryCardItem(story: StoryCardSource | null | undefined): StoryCardItem | null {
  if (!story?.slug || !story.title) return null

  const image = resolveAccessibleImage(story.cardImage, 1200)
  if (!image) return null

  return {
    slug: story.slug,
    title: story.title,
    category: story.category ?? 'Story',
    date: story.date ?? null,
    description: story.description ?? null,
    image: image.src,
    alt: image.alt || story.title,
  }
}

export function toStoryCardItems(
  stories: Array<StoryCardSource | null | undefined> | null | undefined,
): StoryCardItem[] {
  const items: StoryCardItem[] = []
  for (const story of stories ?? []) {
    const item = toStoryCardItem(story)
    if (item) items.push(item)
  }
  return items
}

type CategoryCardSource = {
  slug?: string | null
  title?: string | null
  description?: string | null
  image?: Parameters<typeof resolveAccessibleImage>[0]
}

export function toCategoryCardItem(category: CategoryCardSource | null | undefined): CategoryCard | null {
  if (!category?.slug || !category.title || !category.image) return null

  const resolved = resolveAccessibleImage(category.image, 800)
  if (!resolved) return null

  return {
    slug: category.slug,
    label: category.title,
    description: category.description ?? '',
    image: resolved.src,
    alt: resolved.alt || category.title,
  }
}

export function toCategoryCardItems(
  categories: Array<CategoryCardSource | null | undefined> | null | undefined,
): CategoryCard[] {
  const items: CategoryCard[] = []
  for (const cat of categories ?? []) {
    const item = toCategoryCardItem(cat)
    if (item) items.push(item)
  }
  return items
}

export const toFeaturedStoryCardItem = toStoryCardItem
export const toFeaturedStoryCards = toStoryCardItems

export function toFeaturedStory(
  story: StoryCardSource | null | undefined,
  background?: Parameters<typeof resolveDecorativeImage>[0],
): FeaturedStoryData | null {
  const card = toStoryCardItem(story)
  if (!card) return null

  return {
    slug: card.slug,
    title: card.title,
    image: card.image,
    alt: card.alt,
    background: resolveDecorativeImage(background, 2000),
  }
}

export function toBeautifulPeoplePhotos(
  photos:
    | Array<{
        wide?: boolean | null
        image: Parameters<typeof resolveAccessibleImage>[0]
      } | null>
    | null
    | undefined,
): BeautifulPeoplePhoto[] {
  const items: BeautifulPeoplePhoto[] = []
  for (const photo of photos ?? []) {
    if (!photo) continue
    const image = resolveAccessibleImage(photo.image, 1200)
    if (!image) continue
    items.push({
      src: image.src,
      alt: image.alt,
      wide: photo.wide ?? false,
    })
  }
  return items
}

export function toAboutMarqueeItems(
  items:
    | Array<{
        rotate?: number | null
        image: Parameters<typeof resolveAccessibleImage>[0]
      } | null>
    | null
    | undefined,
): AboutMarqueeItem[] {
  const result: AboutMarqueeItem[] = []
  for (const item of items ?? []) {
    if (!item) continue
    const image = resolveAccessibleImage(item.image, 800)
    if (!image) continue
    result.push({
      src: image.src,
      alt: image.alt,
      rotate: item.rotate ?? 0,
    })
  }
  return result
}

export function toFooterLinks(
  links:
    | Array<{label?: string | null; href?: string | null; external?: boolean | null} | null>
    | null
    | undefined,
): FooterLink[] {
  const result: FooterLink[] = []
  for (const link of links ?? []) {
    if (!link?.label || !link.href) continue
    result.push({
      label: link.label,
      href: link.href,
      external: link.external ?? false,
    })
  }
  return result
}
