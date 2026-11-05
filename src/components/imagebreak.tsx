import Image from 'next/image'

type ImageBreakProps = {
  src: string
  alt: string
  /** CSS object-position, e.g. "center 40%" */
  position?: string
}

export function ImageBreak({src, alt, position = 'center'}: ImageBreakProps) {
  return (
    <section className="p-1.5">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:aspect-[21/9]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{objectPosition: position}}
        />
      </div>
    </section>
  )
}

export default ImageBreak
