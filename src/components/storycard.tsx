import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

type ArchiveItem = {
  slug: string;
  title: string;
  category: string;
  /** ISO date, e.g. "2028-08-21" */
  date: string;
  image: string;
  alt: string;
};

// Hard-coded for now. Swap for a CMS / DB call later.
const items: ArchiveItem[] = [
  {
    slug: "african-americans-at-work",
    title: "African Americans at Work",
    category: "Photo",
    date: "2028-08-21",
    image: "/images/cards/kora-4.jpg",
    alt: "Woman in a patterned dress playing a harp-lute",
  },
  {
    slug: "drowning-in-delay",
    title: "Drowning in Delay: The Revival of Fuzz Worship",
    category: "Essay",
    date: "2028-08-06",
    image: "/images/cards/mandela.jpg",
    alt: "Elderly man holding the bars of a window",
  },
  {
    slug: "color-repetition",
    title: "Color, Repetition and Memory",
    category: "Film",
    date: "2028-07-11",
    image: "/images/cards/mlk.jpg",
    alt: "Black and white portrait of a man in a suit",
  },
  {
    slug: "visual-culture",
    title: "The Natural Aesthetic of Visual Culture",
    category: "Photo",
    date: "2028-06-30",
    image: "/images/cards/girl-afro-2.jpg",
    alt: "Portrait of a young woman with natural hair",
  },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC", // avoids server/client hydration mismatch
  });

export function StoryCards() {
  return (
    <section className="grid grid-cols-1 gap-1.5 p-1.5 sm:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`/archive/${item.slug}`}
          className="group block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 "
        >
          <Card className="relative aspect-[4/3] gap-0 overflow-hidden rounded-lg border-0 p-0">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-x-3 bottom-3 rounded-md bg-zinc-950/60 p-3 text-white backdrop-blur-md">
              <h2 className="line-clamp-2 text-sm font-semibold leading-snug">
                {item.title}
              </h2>
              <p className="mt-1 text-xs text-white/80">
                {item.category} · {formatDate(item.date)}
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </section>
  );
}

export default StoryCards;