import './globals.css'
import type {Metadata} from 'next'
import {Poppins} from 'next/font/google'
import {draftMode} from 'next/headers'

import {VisualEditing} from 'next-sanity/visual-editing'
import { defineQuery } from 'next-sanity'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

import {toFooterLinks} from '@/sanity/lib/mappers'
import {SITE_SETTINGS_QUERY} from '@/sanity/lib/queries'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'

import {
  getDynamicFetchOptions,
  liveWaitFor,
  sanityFetch,
  sanityFetchMetadata,
  SanityLive,
  type DynamicFetchOptions,
} from '@/sanity/lib/live'


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export async function generateMetadata(): Promise<Metadata> {
  const {perspective} = await getDynamicFetchOptions()

  const layoutMetadataQuery = defineQuery(`{
    "settings": *[_type == "settings"][0]{ogImage},
    "home": *[_type == "home"][0]{
      title,
      "overview": pt::text(overview),
    }
  }`)

  const {data: {settings, home},} = await sanityFetchMetadata({query: layoutMetadataQuery, perspective})

  const ogImage = urlForOpenGraphImage(settings?.ogImage)
  
  return {
    title: home?.title
      ? {template: `%s | ${home.title}`, default: home.title || 'Personal website'}
      : undefined,
    description: home?.overview,
    openGraph: {images: ogImage ? [ogImage] : []},
  }
}


export default async function RootLayout({children}: LayoutProps<'/'>) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-[family-name:var(--font-poppins)]">
        <Navbar />
        {children}
        <DynamicFooter />
        {isDraftMode ? <VisualEditing /> : null}
      </body>
    </html>
  )
}


async function fetchSettings({perspective, stega}: DynamicFetchOptions){
  'use cache'
  const {data} = await sanityFetch({query: SITE_SETTINGS_QUERY, perspective, stega})
  return data
}


async function DynamicFooter() {
  const {perspective, stega} = await getDynamicFetchOptions()
  return <CachedFooter perspective={perspective} stega={stega} />
}

async function CachedFooter({perspective, stega}: DynamicFetchOptions) {
  'use cache'
  const settings = await fetchSettings({perspective, stega})
  if (!Array.isArray(settings?.footerLinks)) {
    return null
  }
  return (
    <Footer
    title={settings?.title ?? 'Grain Archive'}
    tagline={settings?.tagline ?? 'Words, images, and signals from the edge'}
    footerLinks={toFooterLinks(settings?.footerLinks)}
    connectLinks={toFooterLinks(settings?.connectLinks)}
  />
  )
}
