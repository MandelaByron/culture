import Link from 'next/link'

export type FooterLink = {
  label: string
  href: string
  external: boolean
}

type FooterProps = {
  title: string
  tagline: string
  footerLinks: FooterLink[]
  connectLinks: FooterLink[]
}

function LinkGroup({title, items}: {title: string; items: FooterLink[]}) {
  if (!items.length) return null

  return (
    <nav aria-label={title}>
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">
        {title}
      </p>
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item.label}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className="text-sm text-white/80 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer({
  title = 'Grain Archive',
  tagline = 'Words, images, and signals from the edge',
  footerLinks = [],
  connectLinks = [],
}: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="px-4 pb-8 pt-16 sm:pt-20">
      <div className="mx-auto max-w-6xl">

        {/* Top rule */}
        <div className="mb-10 h-px w-full bg-white/10" />

        {/* Main footer row */}
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">

          {/* Brand */}
          <div className="max-w-xs">
            <p className="font-serif text-2xl font-medium tracking-tight text-white">
              {title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              {tagline}
            </p>
          </div>

          {/* Nav groups */}
          {(footerLinks.length > 0 || connectLinks.length > 0) && (
            <div className="flex gap-12 sm:gap-16">
              <LinkGroup title="Links" items={footerLinks} />
              <LinkGroup title="Connect" items={connectLinks} />
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            © {year} {title}
          </p>
          <p className="text-xs text-white/30">
            Words, images, and signals from the edge.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
