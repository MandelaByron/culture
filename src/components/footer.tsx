import Image from "next/image";
import Link from "next/link";

type NavItem = { label: string; href: string; external?: boolean };

// Hard-coded for now. Replace the "#" placeholders with your real URLs.
const links: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
];

const connect: NavItem[] = [
  { label: "Instagram", href: "#", external: true },
  { label: "Threads", href: "#", external: true },
  { label: "YouTube", href: "#", external: true },
  { label: "Email", href: "mailto:" },
];

function NavGroup({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <nav
      aria-label={title}
      className="flex flex-col items-start gap-2 lg:items-end"
    >
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
                className="underline underline-offset-2 hover:opacity-70 text-lg"
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className="underline underline-offset-2 hover:opacity-70 text-lg"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="p-1.5">
      <div className=" bg-amber-950 flex flex-col gap-10 rounded-lg py-30 px-5 text-white w-full sm:p-4 lg:min-h-[480px] lg:items-end lg:flex-row lg:justify-center lg:gap-10">
       {/* Wordmark: logo SVG below lg, serif text at lg */}
       <Image
          src="/images/logo-md.svg"
          alt="Grain Archive"
          width={355}
          height={58}
          className="h-auto w-full lg:hidden"
        />
        <p className="hidden w-[800px] self-end font-serif text-[7rem] font-medium leading-[0.9] tracking-tight lg:block xl:text-[9rem]">
          Grain
          <br />
          Archive
        </p>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between lg:flex-col lg:items-end lg:justify-between lg:text-right">
          <div className="grid grid-cols-2 gap-x-10 md:flex md:gap-x-16 lg:gap-x-10">
            <NavGroup title="Links" items={links} />
            <NavGroup title="Connect" items={connect} />
          </div>

          <p className="text-base leading-snug md:text-right">
            ©{new Date().getFullYear()} Grain Archive
            <br />
            Words, images, and signals from the edge
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;