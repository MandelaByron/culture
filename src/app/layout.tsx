import './globals.css'
import type {Metadata} from 'next'
import {Poppins} from 'next/font/google'
import {draftMode} from 'next/headers'

import {VisualEditing} from 'next-sanity/visual-editing'


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

export const metadata: Metadata = {
  metadataBase: new URL("https://next-mdx-blog.vercel.app"),
  alternates: { canonical: "/" },
  title: { default: "Byron Mandela", template: "%s | Byron Mandela" },
  description: "Engineer and writer.",
};

export default async function RootLayout({children}: LayoutProps<'/'>) {
  const {isEnabled: isDraftMode} = await draftMode()
  const {data} = await sanityFetch({query: SITE_SETTINGS_QUERY})

  const title = data?.title ?? 'Grain Archive'
  const tagline = data?.tagline ?? 'Words, images, and signals from the edge'
  const footerLinks = toFooterLinks(data?.footerLinks)
  const connectLinks = (data?.connectLinks ?? []).map((link) => ({
    ...link,
    external: link.external ?? false,
  }))

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
        {isDraftMode ? <VisualEditing /> : null}
      </body>
    </html>
  )
}

