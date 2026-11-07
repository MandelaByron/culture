import Image from 'next/image'
import HomeCategories, {type CategoryCard} from '@/components/home-categories'
import FeaturedStories, {type FeaturedStoryCard} from '@/components/featured-stories'
import {sanityFetch} from '@/sanity/lib/live'
import {resolveAccessibleImage} from '@/sanity/lib/image'
import {HOME_PAGE_QUERY} from '@/sanity/lib/queries'
import {notFound} from 'next/navigation'

// ── Placeholder data (replace with Sanity queries when types are ready) ────────

const PLACEHOLDER_CATEGORIES: CategoryCard[] = [
  {
    slug: 'photo',
    label: 'Photo',
    description: 'Still frames that hold entire worlds',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    alt: 'Mountain landscape at golden hour',
  },
  {
    slug: 'essay',
    label: 'Essay',
    description: 'Long-form ideas worth sitting with',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80',
    alt: 'Open notebook and pen on a desk',
  },
  {
    slug: 'film',
    label: 'Film',
    description: 'Moving images, lasting impressions',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80',
    alt: 'Film camera on a wooden surface',
  },
  {
    slug: 'culture',
    label: 'Culture',
    description: 'Scenes from the human experiment',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
    alt: 'People gathered at an outdoor event',
  },
]

const PLACEHOLDER_STORIES: FeaturedStoryCard[] = [
  {slug: 'the-last-light', title: 'The Last Light of Summer', description: 'A photographer chases dusk across three continents in search of the perfect vanishing moment.', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80', alt: 'Sunset over open water', category: 'Photo'},
  {slug: 'quiet-machines', title: 'Quiet Machines', description: 'Inside the factories that still make things by hand — and the people who refuse to let them die.', image: 'https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=800&q=80', alt: 'Craftsman at work in a workshop', category: 'Essay'},
  {slug: 'borderline', title: 'Borderline', description: 'A road trip essay across a frontier that exists on maps but not in memory.', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', alt: 'Empty road through a desert landscape', category: 'Essay'},
  {slug: 'analog-revival', title: 'The Analog Revival', description: 'Why a new generation is reaching for film cameras in a world of infinite pixels.', image: 'https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=800&q=80', alt: 'Stack of film cameras', category: 'Film'},
  {slug: 'deep-blue', title: 'Deep Blue', description: 'Freediving into the world's clearest waters — and what lies at the bottom.', image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80', alt: 'Underwater photograph of coral reef', category: 'Photo'},
  {slug: 'the-archive', title: 'The Archive', description: 'A visit to the man who has photographed every significant moment in his city for 40 years.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', alt: 'Elderly man surrounded by photo albums', category: 'Photo'},
  {slug: 'neon-hours', title: 'Neon Hours', description: 'What nightlife looks like when the music stops — portraits of the in-between.', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80', alt: 'Neon lights reflecting on a wet street', category: 'Culture'},
  {slug: 'grain-and-salt', title: 'Grain & Salt', description: 'A food photographer turns the lens on the communities behind the ingredients.', image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&q=80', alt: 'Market vendor arranging spices', category: 'Culture'},
  {slug: 'studio-portrait', title: 'Studio Portrait', description: 'What happens when you give complete strangers one hour and a camera?', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', alt: 'Black and white studio portrait', category: 'Photo'},
  {slug: 'the-river', title: 'The River Knows', description: 'Following the Zambezi from source to sea — a journey through five countries and one idea.', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80', alt: 'Aerial view of a winding river', category: 'Essay'},
  {slug: 'cut-to-black', title: 'Cut to Black', description: 'The cinematographers who shaped African cinema, in their own words.', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80', alt: 'Director looking through a camera viewfinder', category: 'Film'},
  {slug: 'found-objects', title: 'Found Objects', description: 'Street photography as archaeology — picking up what the city drops.', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80', alt: 'Urban street scene with scattered objects', category: 'Culture'},
]

// ──────────────────────────────────────────────────────────────────────────────

export default async function Home() {
  const {data} = await sanityFetch({query: HOME_PAGE_QUERY})
  const home = data.home
  if (!home) notFound()

  const hero = resolveAccessibleImage(home.heroImage, 2400)

  return (
    <main className="bg-grain min-h-svh text-white [--grain-base:#161616]">

      {/* ── Hero — reduced height, centred, no full-bleed ───────────────── */}
      {hero ? (
        <section className="px-4 pb-4 pt-24 sm:pt-28">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl">
            {hero.naturalWidth && hero.naturalHeight ? (
              <Image
                src={hero.src}
                alt={hero.alt}
                width={hero.naturalWidth}
                height={hero.naturalHeight}
                preload
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="h-auto max-h-[60vh] w-full object-cover"
              />
            ) : (
              <div className="relative aspect-[16/9] sm:aspect-[21/9]">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  fill
                  preload
                  sizes="(min-width: 1152px) 1152px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* ── Categories ─────────────────────────────────────────────────── */}
      <HomeCategories items={PLACEHOLDER_CATEGORIES} />

      {/* ── Featured Stories ───────────────────────────────────────────── */}
      <FeaturedStories items={PLACEHOLDER_STORIES} />

    </main>
  )
}
