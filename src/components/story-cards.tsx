import Image from 'next/image'
import Link from 'next/link'
import {formatDate} from '@/lib/format-date'

export type StoryCardItem = {
  slug: string
  title: string
  category: string
  description?: string | null
  /** ISO date, e.g. "2028-08-21" */
  date?: string | null
  image: string
  alt: string
}

type StoryCardsProps = {
  items: StoryCardItem[]
  heading?: string
  className?: string
}

/**
 * Responsive, centralized story cards grid:
 * 1 col on mobile → 2 col on tablet → 3 col on desktop.
 * Centered within max-w-6xl spine, matching the modern editorial design language.
 */
export function StoryCards({items, heading, className = ''}: StoryCardsProps) {
  if (!items.length) return null

  return (
    <section className={`px-4 py-12 sm:py-16 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {heading && (
          <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
            {heading}
          </h2>
        )}

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/archive/${item.slug}`}
                className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {/* Image container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Subtle category pill */}
                  {item.category && (
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Text below image */}
                <div className="mt-3 px-0.5">
                  <p className="text-sm font-bold leading-snug text-white transition-colors group-hover:text-white/80">
                    {item.title}
                  </p>
                  {item.description ? (
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/50">
                      {item.description}
                    </p>
                  ) : item.date ? (
                    <p className="mt-1 text-xs text-white/50">
                      {formatDate(item.date)}
                    </p>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default StoryCards
