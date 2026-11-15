import Image from 'next/image'

type StoryFigureProps = {
  image: string
  alt: string
  /** Fallback title if no custom caption is provided */
  title?: string
  /** Short informative description of this figure */
  caption?: string | null
  /** Photographer, creator, or archive credit */
  credit?: string | null
  /** Year taken or published */
  year?: string | null
  /** Optional fallback meta string (e.g. category · date) */
  meta?: string | null
  /** Intrinsic pixel width from Sanity metadata — enables natural-ratio rendering */
  naturalWidth?: number | null
  /** Intrinsic pixel height from Sanity metadata — enables natural-ratio rendering */
  naturalHeight?: number | null
}

/**
 * Editorial figure: image renders at its natural aspect ratio (no crop),
 * centred in a constrained column, with an informative caption below
 * (short description on the left, credit · year on the right).
 */
export function StoryFigure({
  image,
  alt,
  title,
  caption,
  credit,
  year,
  meta,
  naturalWidth,
  naturalHeight,
}: StoryFigureProps) {
  const hasNaturalDims = naturalWidth && naturalHeight

  // Informative description: prefer custom caption, fall back to title if provided
  const primaryText = caption || title
  // Secondary metadata: credit & year (e.g. "Jane Doe · 2024"), or fall back to meta
  const metaParts = [credit, year].filter(Boolean)
  const secondaryText = metaParts.length > 0 ? metaParts.join(' · ') : meta

  return (
    <section className="px-4 py-8 sm:py-12">
      <figure className="mx-auto max-w-3xl">
        {/* Image — natural ratio, constrained height, no crop */}
        <div className="flex justify-center overflow-hidden rounded-lg">
          {hasNaturalDims ? (
            <Image
              src={image}
              alt={alt}
              width={naturalWidth}
              height={naturalHeight}
              sizes="(min-width: 1024px) 768px, (min-width: 640px) calc(100vw - 2rem), 100vw"
              className="h-auto max-h-[50vh] sm:max-h-[60vh] lg:max-h-[500px] w-auto max-w-full rounded-lg object-contain shadow-md"
            />
          ) : (
            /* Fallback: fill inside a 16:10 box if metadata is unavailable */
            <div className="relative aspect-[16/10] w-full max-h-[500px] overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 768px, (min-width: 640px) calc(100vw - 2rem), 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Informative caption below the image */}
        {(primaryText || secondaryText) && (
          <figcaption className="mt-3.5 flex flex-col gap-1 px-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            {primaryText && (
              <p className="font-serif text-sm leading-relaxed text-white/90">
                {primaryText}
              </p>
            )}
            {secondaryText && (
              <p className="shrink-0 font-serif text-xs text-white/50">
                {secondaryText}
              </p>
            )}
          </figcaption>
        )}
      </figure>
    </section>
  )
}

export default StoryFigure
