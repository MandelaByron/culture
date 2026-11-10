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
      {/* ── Page Title ─────────────────────────────────────────────────── */}
      <h1 className="px-4 pb-12 pt-36 text-center font-serif text-7xl font-medium leading-none tracking-tight sm:pb-16 sm:pt-44 sm:text-9xl">
        {heading}
      </h1>

      {/* ── Marquee of cutouts / found objects ─────────────────────────── */}
      <AboutMarquee items={marqueeItems} />

      {/* ── Why this exists / Mission ──────────────────────────────────── */}
      {whyText ? (
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 font-serif text-xs font-bold uppercase tracking-widest text-white/40">
              {whyHeading}
            </p>
            <p className="whitespace-pre-line font-serif text-xl sm:text-2xl font-normal leading-relaxed text-white/90">
              {whyText}
            </p>
          </div>
        </section>
      ) : null}

      {/* ── Divider ────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-4">
        <div className="h-px w-full bg-white/10" />
      </div>

      {/* ── Contact Section ─────────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Contact Image — centralized, natural aspect ratio, no crop */}
            {contactImage ? (
              <div className="overflow-hidden rounded-2xl bg-[#1d1d1d]">
                {contactImage.naturalWidth && contactImage.naturalHeight ? (
                  <Image
                    src={contactImage.src}
                    alt={contactImage.alt}
                    width={contactImage.naturalWidth}
                    height={contactImage.naturalHeight}
                    sizes="(min-width: 1024px) 480px, (min-width: 640px) 600px, 100vw"
                    className="h-auto w-full object-cover"
                    style={
                      contactImage.objectPosition
                        ? {objectPosition: contactImage.objectPosition}
                        : undefined
                    }
                  />
                ) : (
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={contactImage.src}
                      alt={contactImage.alt}
                      fill
                      sizes="(min-width: 1024px) 480px, (min-width: 640px) 600px, 100vw"
                      className="object-cover"
                      style={
                        contactImage.objectPosition
                          ? {objectPosition: contactImage.objectPosition}
                          : undefined
                      }
                    />
                  </div>
                )}
              </div>
            ) : null}

            {/* Contact Details */}
            <div className="flex flex-col justify-center">
              <p className="mb-3 font-serif text-xs font-bold uppercase tracking-widest text-white/40">
                Contact
              </p>
              <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
                {contactHeading}
              </h2>

              {contactIntro ? (
                <p className="mt-4 font-serif text-base leading-relaxed text-white/80 sm:text-lg">
                  {contactIntro}
                </p>
              ) : null}

              {(contactOutro || contactEmail) && (
                <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-xs">
                  {contactOutro ? (
                    <p className="text-xs uppercase tracking-wider text-white/50">
                      {contactOutro}
                    </p>
                  ) : null}
                  {contactEmail ? (
                    <a
                      href={`mailto:${contactEmail}`}
                      className="mt-2 inline-block font-serif text-xl font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white sm:text-2xl"
                    >
                      {contactEmail}
                    </a>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
