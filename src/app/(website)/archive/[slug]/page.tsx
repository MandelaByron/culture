import type {Metadata} from 'next'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import {StoryFigure} from '@/components/storyfigure'
import {StoryCards} from '@/components/story-cards'
import {formatDate} from '@/lib/format-date'
import {resolveAccessibleImage} from '@/sanity/lib/image'
import {sanityFetch} from '@/sanity/lib/live'
import {toStoryCardItems} from '@/sanity/lib/mappers'
import {
  ARCHIVE_PAGE_QUERY,
  STORY_BY_SLUG_QUERY,
  STORY_SLUGS_QUERY,
} from '@/sanity/lib/queries'

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: STORY_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  })

  return (data ?? [])
    .map((story) => story.slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({slug}))
}

export async function generateMetadata(
  props: PageProps<'/archive/[slug]'>,
): Promise<Metadata> {
  const {slug} = await props.params
  const {data: story} = await sanityFetch({
    query: STORY_BY_SLUG_QUERY,
    params: {slug},
    stega: false,
  })

  if (!story) return {}

  return {
    title: `${story.title} | Grain Archive`,
    description: story.intro,
  }
}

export default async function StoryPage(props: PageProps<'/archive/[slug]'>) {
  const {slug} = await props.params
  const [{data: story}, {data: allStories}] = await Promise.all([
    sanityFetch({query: STORY_BY_SLUG_QUERY, params: {slug}, stega: false}),
    sanityFetch({query: ARCHIVE_PAGE_QUERY, stega: false}),
  ])

  if (!story) notFound()

  const heroSource = story.hero ?? story.cardImage
  const hero = resolveAccessibleImage(heroSource, 2400)
  const meta = `${story.category} · ${formatDate(story.date)}`
  const more = toStoryCardItems(allStories).filter((item) => item.slug !== story.slug).slice(0, 4)

  return (
    <main className="bg-grain min-h-svh text-white [--grain-base:#161616]">
      <h1 className="mx-auto max-w-5xl text-balance px-3 pb-24 pt-36 text-center font-serif text-6xl font-medium leading-none tracking-tight sm:pb-44 sm:pt-44 sm:text-8xl">
        {story.title}
      </h1>

      {hero ? (
        <section className="p-1.5">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg sm:aspect-[2/1]">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={hero.objectPosition ? {objectPosition: hero.objectPosition} : undefined}
            />
          </div>
        </section>
      ) : null}

      {story.intro ? (
        <section className="grid gap-3 px-5 py-20 sm:py-28 md:grid-cols-[240px_1fr]">
          <h2 className="font-serif text-sm font-bold">Intro</h2>
          <p className="font-serif text-base font-bold leading-7">{story.intro}</p>
        </section>
      ) : null}

      {story.figures?.map((figure) => {
        const image = resolveAccessibleImage(figure, 2000)
        if (!image) return null

        return (
          <StoryFigure
            key={figure._key}
            image={image.src}
            alt={image.alt}
            title={story.title}
            meta={meta}
            objectPosition={image.objectPosition}
          />
        )
      })}

      <StoryCards items={more} />
    </main>
  )
}
