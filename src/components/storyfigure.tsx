import Image from 'next/image'

type StoryFigureProps = {
  image: string
  alt: string
  title: string
  meta: string
  objectPosition?: string
}

/** Image inside a lighter charcoal panel, with the caption over the bottom-left. */
export function StoryFigure({image, alt, title, meta, objectPosition}: StoryFigureProps) {
  return (
    <section className="p-1.5">
      <div className="bg-grain-charcoal rounded-lg px-4 py-12">
        <figure className="relative aspect-[4/3] overflow-hidden rounded-md sm:aspect-[2/1]">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="100vw"
            className="object-cover"
            style={objectPosition ? {objectPosition} : undefined}
          />

          <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-5 pt-20 text-white">
            <p className="text-lg font-semibold leading-tight">{title}</p>
            <p className="mt-1 font-serif text-xs font-bold text-white/90">{meta}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export default StoryFigure
