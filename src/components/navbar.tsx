"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Each item has its own color and shape, as in the design.
const items = [
  {
    label: "Home",
    href: "/",
    style: "rounded-sm bg-[#a43d9c] text-white",
  },
  {
    label: "Archive",
    href: "/archive",
    style: "rounded-full bg-[#f4b183] text-black",
  },
  {
    label: "About",
    href: "/about",
    style: "rounded-md bg-[#9ec9f5] text-black",
  },
];

export function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center p-3">
      <Link
        href="/"
        aria-label="Grain Archive home"
        className="flex size-11 items-center justify-center rounded-full bg-white font-sans text-sm font-extrabold tracking-tight text-black shadow-sm transition-transform hover:scale-105"
      >
        G·A
      </Link>

      <nav
        aria-label="Main"
        className="absolute left-1/2 top-3 flex -translate-x-1/2 gap-2"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={`px-3.5 py-4 font-serif text-sm font-bold leading-none shadow-sm transition-transform hover:scale-105 aria-[current=page]:ring-2 aria-[current=page]:ring-white ${item.style}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;