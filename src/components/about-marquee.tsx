import Image from 'next/image'
import Marquee from 'react-fast-marquee'

export type AboutMarqueeItem = {
  src: string
  alt: string
  rotate?: number
}

type AboutMarqueeProps = {
  items: AboutMarqueeItem[]
}

export function AboutMarquee({items}: AboutMarqueeProps) {
  if (!items.length) return null

  return (
    <section aria-label="Found objects" className="py-16 sm:py-24">
      <Marquee speed={40} pauseOnHover className="overflow-y-hidden">
        {items.map((item) => (
          <Image
            key={`${item.src}-${item.alt}`}
            src={item.src}
            alt={item.alt}
            width={400}
            height={300}
            className="mx-8 h-54 w-auto max-w-none shrink-0 sm:h-72"
            style={{rotate: `${item.rotate ?? 0}deg`}}
          />
        ))}
      </Marquee>
    </section>
  )
}

export default AboutMarquee
