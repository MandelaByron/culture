"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Each item has its own color and shape, as in the design.
const items = [
  {
    label: "Home",
    href: "/",
    style: "bg-orange-400 text-black",
  },
  {
    label: "Archive",
    href: "/archive",
    style: "rounded-full bg-green-400 text-black",
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
      <nav
        aria-label="Main"
        className="absolute left-1/2 top-3 flex -translate-x-1/2 gap-2"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={`px-3.5 py-4 text-2xl font-semibold leading-none shadow-sm transition-transform hover:bg-white hover:scale-105 ${item.style}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;