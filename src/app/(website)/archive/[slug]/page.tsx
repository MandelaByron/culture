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
} from '@/sanity/lib/queries'

// export async function generateStaticParams() {
//   const {data} = await sanityFetch({
//     query: STORY_SLUGS_QUERY,
//     perspective: 'published',
//     stega: false,
//   })

//   return (data ?? [])
//     .map((story) => story.slug)
//     .filter((slug): slug is string => Boolean(slug))
//     .map((slug) => ({slug}))
// }

type StoryPageProps = {
  params: Promise<{slug: string}>
}

export async function generateMetadata(
  props: StoryPageProps,
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

export default async function StoryPage(props: StoryPageProps) {
  const {slug} = await props.params
  const [{data: story}, {data: allStories}] = await Promise.all([
    sanityFetch({query: STORY_BY_SLUG_QUERY, params: {slug}, stega: false}),
    sanityFetch({query: ARCHIVE_PAGE_QUERY, stega: false}),
  ])

  if (!story) notFound()

  const heroSource = story.hero ?? story.cardImage
  const hero = resolveAccessibleImage(heroSource, 2400)
  const meta = [story.category, story.date ? formatDate(story.date) : null]
    .filter(Boolean)
    .join(' · ')
  const more = toStoryCardItems(allStories)
    .filter((item) => item.slug !== story.slug)
    .slice(0, 3)

  return (
    <main className="bg-grain min-h-svh text-white [--grain-base:#161616]">

      {/* ── Title ─────────────────────────────────────────────────────── */}
      <h1 className="mx-auto max-w-4xl text-balance px-4 pb-16 pt-36 text-center font-serif text-3xl font-medium leading-none tracking-tight sm:pb-28 sm:pt-44 sm:text-6xl">
        {story.title}
      </h1>

      {/* ── Hero image — natural ratio, no crop, centred spine ─────────── */}
      {hero ? (
        <section className="px-4 pb-10 sm:pb-16">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-lg">
            {hero.naturalWidth && hero.naturalHeight ? (
              <Image
                src={hero.src}
                alt={hero.alt}
                width={hero.naturalWidth}
                height={hero.naturalHeight}
                preload
                sizes="(min-width: 1024px) 896px, (min-width: 640px) calc(100vw - 2rem), 100vw"
                className="h-auto w-full"
              />
            ) : (
              /* Fallback if metadata is absent */
              <div className="relative aspect-[4/3] sm:aspect-[3/2]">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 896px, (min-width: 640px) calc(100vw - 2rem), 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* ── Intro ─────────────────────────────────────────────────────── */}
      {story.intro ? (
        <section className="mx-auto max-w-2xl px-4 py-14 sm:py-20">
          <p className="mb-3 font-serif text-xs font-bold uppercase tracking-widest text-white/40">
            Intro
          </p>
          <p className="font-serif text-base font-bold leading-7 text-white/90">{story.intro}</p>
        </section>
      ) : null}

      {/* ── Figures — natural ratio, informative caption below ─────────── */}
      {story.figures?.map((figure) => {
        const image = resolveAccessibleImage(figure.image, 2000)
        if (!image) return null

        return (
          <StoryFigure
            key={figure._key}
            image={image.src}
            alt={image.alt}
            title={story.title ?? 'Untitled'}
            caption={figure.caption}
            credit={figure.credit}
            year={figure.year}
            meta={meta}
            naturalWidth={image.naturalWidth}
            naturalHeight={image.naturalHeight}
          />
        )
      })}

      {/* ── More Stories ──────────────────────────────────────────────── */}
      {more.length > 0 && (
        <section className="mt-16 border-t border-white/10 pt-8 sm:mt-24 sm:pt-12">
          <StoryCards items={more} heading="More Stories" />
        </section>
      )}

    </main>
  )
}
