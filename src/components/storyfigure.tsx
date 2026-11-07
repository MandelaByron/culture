import Image from 'next/image'

type StoryFigureProps = {
  image: string
  alt: string
  title: string
  meta: string
  /** Intrinsic pixel width from Sanity metadata — enables natural-ratio rendering. */
  naturalWidth?: number | null
  /** Intrinsic pixel height from Sanity metadata — enables natural-ratio rendering. */
  naturalHeight?: number | null
}

/**
 * Editorial figure: image renders at its natural aspect ratio (no crop),
 * centred in a constrained column, with the caption placed below.
 */
export function StoryFigure({image, alt, title, meta, naturalWidth, naturalHeight}: StoryFigureProps) {
  const hasNaturalDims = naturalWidth && naturalHeight

  return (
    <section className="px-4 py-10 sm:py-14">
      <figure className="mx-auto max-w-4xl">
        {/* Image — scales to container width at its intrinsic ratio, no crop */}
        <div className="overflow-hidden rounded-lg">
          {hasNaturalDims ? (
            <Image
              src={image}
              alt={alt}
              width={naturalWidth}
              height={naturalHeight}
              sizes="(min-width: 1024px) 896px, (min-width: 640px) calc(100vw - 2rem), 100vw"
              className="h-auto w-full"
            />
          ) : (
            /* Fallback: fill inside a 3:2 box if metadata is unavailable */
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 896px, (min-width: 640px) calc(100vw - 2rem), 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Caption below the image */}
        <figcaption className="mt-4 flex items-baseline justify-between gap-4 px-1">
          <p className="font-serif text-sm font-semibold text-white/90 leading-snug">{title}</p>
          <p className="shrink-0 font-serif text-xs text-white/50">{meta}</p>
        </figcaption>
      </figure>
    </section>
  )
}

export default StoryFigure
