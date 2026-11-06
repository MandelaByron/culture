import Image from 'next/image'
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

function NavGroup({title, items}: {title: string; items: FooterLink[]}) {
  if (!items.length) return null

  return (
    <nav aria-label={title} className="flex flex-col items-start gap-2 lg:items-end">
      <span className="rounded-full border border-white/70 px-1.5 py-px text-[8px] uppercase leading-tight tracking-wide">
        {title}
      </span>
      <ul className="flex flex-col gap-0.5 text-sm">
        {items.map((item) => (
          <li key={item.label}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg underline underline-offset-2 hover:opacity-70"
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className="text-lg underline underline-offset-2 hover:opacity-70"
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
  const wordmark = title.includes(' ')
    ? title.split(/\s+/).map((part, i) => (
        <span key={part}>
          {i > 0 ? <br /> : null}
          {part}
        </span>
      ))
    : title

  return (
    <footer className="p-1.5">
      <div className="flex w-full flex-col gap-10 rounded-lg px-5 py-30 text-white sm:p-4 lg:min-h-[480px] lg:flex-row lg:items-end lg:justify-center lg:gap-10">
        <Image
          src="/images/logo-md.svg"
          alt={title}
          width={355}
          height={58}
          className="h-auto w-full lg:hidden"
        />
        <p className="hidden w-[800px] self-end font-serif text-[7rem] font-medium leading-[0.9] tracking-tight lg:block xl:text-[9rem]">
          {wordmark}
        </p>
        <div className="flex w-full flex-col gap-10 md:flex-row md:items-start md:justify-between lg:flex-col lg:items-end lg:justify-between lg:text-right">
          <div className="grid grid-cols-2 gap-x-10 md:flex md:gap-x-16 lg:gap-x-10">
            <NavGroup title="Links" items={footerLinks} />
            <NavGroup title="Connect" items={connectLinks} />
          </div>

          <p className="text-base leading-snug md:text-right">
            ©{year} {title}
            <br />
            {tagline}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
