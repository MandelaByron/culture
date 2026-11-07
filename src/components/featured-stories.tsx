import Image from 'next/image'
import Link from 'next/link'

export type FeaturedStoryCard = {
  slug: string
  title: string
  description: string
  image: string
  alt: string
  category: string
}

type FeaturedStoriesProps = {
  items: FeaturedStoryCard[]
}

export function FeaturedStories({items}: FeaturedStoriesProps) {
  if (!items.length) return null

  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
          Featured Stories
        </h2>

        {/* Grid: 1 col mobile → 2 col tablet → 3 col desktop */}
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((story) => (
            <li key={story.slug}>
              <Link
                href={`/archive/${story.slug}`}
                className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Subtle category pill */}
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                      {story.category}
                    </span>
                  </div>
                </div>

                {/* Text below image */}
                <div className="mt-3 px-0.5">
                  <p className="text-sm font-bold leading-snug text-white transition-colors group-hover:text-white/80">
                    {story.title}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/50">
                    {story.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default FeaturedStories
