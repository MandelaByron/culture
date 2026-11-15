import './globals.css'
import type {Metadata} from 'next'
import {Poppins} from 'next/font/google'
import {draftMode} from 'next/headers'

import {VisualEditing} from 'next-sanity/visual-editing'
import { SanityLive } from '@/sanity/lib/live'


import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

import {toFooterLinks} from '@/sanity/lib/mappers'
import {SITE_SETTINGS_QUERY} from '@/sanity/lib/queries'

import { sanityFetch } from '@/sanity/lib/live'


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://chedi.vercel.app'

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await sanityFetch({query: SITE_SETTINGS_QUERY, stega: false})

  const title = data?.title ?? 'Chedi'
  const description = data?.tagline ?? 'Words, images, and signals from the edge.'

  return {
    metadataBase: new URL(siteUrl),
    alternates: { canonical: '/' },
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
    },
    manifest: '/site.webmanifest',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: '/',
      siteName: title,
      title,
      description,
      images: [
        {
          url: '/chedi-og.png',
          width: 1200,
          height: 630,
          alt: `${title} Logo`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/chedi-og.png'],
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {isEnabled: isDraftMode} = await draftMode()
  const {data} = await sanityFetch({query: SITE_SETTINGS_QUERY})

  const title = data?.title ?? 'Chedi'
  const tagline = data?.tagline ?? 'Words, images, and signals from the edge'
  const footerLinks = toFooterLinks(data?.footerLinks)
  const connectLinks = toFooterLinks(data?.connectLinks)

  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-[family-name:var(--font-poppins)]">
        <Navbar />
        {children}
        <Footer
          title={title}
          tagline={tagline}
          footerLinks={footerLinks}
          connectLinks={connectLinks}
        />
        <SanityLive />
        {isDraftMode ? <VisualEditing /> : null}
      </body>
    </html>
  )
}

