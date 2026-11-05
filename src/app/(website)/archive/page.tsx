import type {Metadata} from 'next'
import {StoryCards} from '@/components/story-cards'
import {sanityFetch} from '@/sanity/lib/live'
import {toStoryCardItems} from '@/sanity/lib/mappers'
import {ARCHIVE_PAGE_QUERY, SITE_SETTINGS_QUERY} from '@/sanity/lib/queries'

export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await sanityFetch({query: SITE_SETTINGS_QUERY, stega: false})
  const title = settings?.title ?? 'Grain Archive'
  const tagline = settings?.tagline ?? 'Words, images, and signals from the edge'

  return {
    title: `Stories | ${title}`,
    description: tagline,
  }
}

export default async function StoriesPage() {
  const {data} = await sanityFetch({query: ARCHIVE_PAGE_QUERY, stega: false})
  const items = toStoryCardItems(data)

  return (
    <main className="min-h-svh text-white">
      <h1 className="px-3 pb-32 pt-36 text-center font-serif text-7xl font-medium leading-none tracking-tight sm:pb-48 sm:pt-44 sm:text-9xl">
        Stories
      </h1>

      <StoryCards items={items} />
    </main>
  )
}
