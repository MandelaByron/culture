import Image from 'next/image'
import Link from 'next/link'
import {Card} from '@/components/ui/card'
import {formatDate} from '@/lib/format-date'

export type StoryCardItem = {
  slug: string
  title: string
  category: string
  /** ISO date, e.g. "2028-08-21" */
  date: string
  image: string
  alt: string
  objectPosition?: string
}

type StoryCardsProps = {
  items: StoryCardItem[]
}

export function StoryCards({items}: StoryCardsProps) {
  if (!items.length) return null

  return (
    <section className="grid grid-cols-1 gap-1.5 p-1.5 sm:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`/archive/${item.slug}`}
          className="group block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Card className="relative aspect-[4/3] gap-0 overflow-hidden rounded-lg border-0 p-0">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              style={item.objectPosition ? {objectPosition: item.objectPosition} : undefined}
            />

            <div className="absolute inset-x-3 bottom-3 rounded-md bg-zinc-950/60 p-3 text-white backdrop-blur-md">
              <h2 className="line-clamp-2 text-sm font-semibold leading-snug">{item.title}</h2>
              <p className="mt-1 text-xs text-white/80">
                {item.category} · {formatDate(item.date)}
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </section>
  )
}

export default StoryCards
