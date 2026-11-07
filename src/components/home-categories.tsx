import Image from 'next/image'
import Link from 'next/link'

export type CategoryCard = {
  slug: string
  label: string
  /** Short description shown on the card */
  description: string
  image: string
  alt: string
}

type HomeCategoriesProps = {
  items: CategoryCard[]
}

export function HomeCategories({items}: HomeCategoriesProps) {
  if (!items.length) return null

  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
          What interests you?
        </h2>

        {/* 4-column card row — collapses to 2 on mobile */}
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/archive?category=${cat.slug}`}
                className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {/* Card */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay so text is always legible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Text */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-base font-semibold leading-tight text-white">
                      {cat.label}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-white/70">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HomeCategories
