import Image from 'next/image'

export type BeautifulPeoplePhoto = {
  src: string
  alt: string
  /** Spans two columns (the wide tile) */
  wide?: boolean
}

type BeautifulPeopleProps = {
  heading?: string
  photos: BeautifulPeoplePhoto[]
}

export function BeautifulPeople({
  heading = 'Beautiful People',
  photos,
}: BeautifulPeopleProps) {
  if (!photos.length) return null

  return (
    <section className="p-1.5">
      <div className="rounded-lg bg-grain-white p-3 text-black sm:p-4">
        <h2 className="mb-6 text-5xl font-medium leading-none tracking-tight sm:mb-8 sm:text-7xl lg:text-8xl">
          {heading}
        </h2>

        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={`${photo.src}-${photo.alt}`}
              className={
                photo.wide
                  ? 'relative col-span-2 aspect-[2/1] overflow-hidden rounded-md sm:aspect-auto'
                  : 'relative aspect-square overflow-hidden rounded-md'
              }
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={
                  photo.wide
                    ? '(min-width: 640px) 66vw, 100vw'
                    : '(min-width: 640px) 33vw, 50vw'
                }
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BeautifulPeople
