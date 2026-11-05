import type {Metadata} from 'next'
import Image from 'next/image'
import AboutMarquee from '@/components/about-marquee'
import {sanityFetch} from '@/sanity/lib/live'
import {resolveAccessibleImage} from '@/sanity/lib/image'
import {toAboutMarqueeItems} from '@/sanity/lib/mappers'
import {ABOUT_PAGE_QUERY, SITE_SETTINGS_QUERY} from '@/sanity/lib/queries'

export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await sanityFetch({query: SITE_SETTINGS_QUERY, stega: false})
  const title = settings?.title ?? 'Grain Archive'
  const tagline = settings?.tagline ?? 'Words, images, and signals from the edge'

  return {
    title: `About | ${title}`,
    description: tagline,
  }
}

export default async function AboutPage() {
  const {data} = await sanityFetch({query: ABOUT_PAGE_QUERY, stega: false})

  const heading = data?.heading ?? 'About'
  const marqueeItems = toAboutMarqueeItems(data?.marqueeItems)
  const whyHeading = data?.whyHeading ?? 'Why this exists'
  const whyText = data?.whyText
  const contactHeading = data?.contactHeading ?? 'Contact'
  const contactImage = resolveAccessibleImage(data?.contactImage, 1600)
  const contactIntro = data?.contactIntro
  const contactOutro = data?.contactOutro
  const contactEmail = data?.contactEmail

  return (
    <main className="bg-grain min-h-svh text-white [--grain-base:#161616]">
      <h1 className="px-3 pt-32 text-center text-8xl font-black leading-none tracking-tighter sm:pt-40 sm:text-[11rem]">
        {heading}
      </h1>

      <AboutMarquee items={marqueeItems} />

      {whyText ? (
        <section className="mx-auto grid max-w-5xl gap-3 pb-24 sm:pb-40 md:grid-cols-[240px_1fr]">
          <h2 className="text-xl font-semibold">{whyHeading}</h2>
          <p className="whitespace-pre-line text-xl font-semibold leading-7">{whyText}</p>
        </section>
      ) : null}

      <section className="grid items-center gap-10 p-1.5 pb-16 md:grid-cols-2 md:gap-0">
        {contactImage ? (
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-lg">
            <Image
              src={contactImage.src}
              alt={contactImage.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              style={
                contactImage.objectPosition
                  ? {objectPosition: contactImage.objectPosition}
                  : undefined
              }
            />
          </div>
        ) : (
          <div />
        )}

        <div className="max-w-sm px-4 md:mx-auto md:px-0">
          <h2 className="text-lg font-semibold">{contactHeading}</h2>
          {contactIntro ? (
            <p className="mt-6 text-base font-semibold leading-7">{contactIntro}</p>
          ) : null}
          {contactOutro || contactEmail ? (
            <p className="mt-6 text-base font-semibold leading-7">
              {contactOutro ? `${contactOutro} ` : null}
              {contactEmail ? (
                <a
                  href={`mailto:${contactEmail}`}
                  className="underline underline-offset-2 hover:opacity-70"
                >
                  {contactEmail}
                </a>
              ) : null}
              {contactEmail ? '.' : null}
            </p>
          ) : null}
        </div>
      </section>
    </main>
  )
}
