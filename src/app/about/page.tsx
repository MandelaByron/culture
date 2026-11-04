import type { Metadata } from "next";
import Image from "next/image";
import Marquee from "react-fast-marquee";


export const metadata: Metadata = {
  title: "About | Grain Archive",
  description: "Words, images, and signals from the edge",
};

// Hard-coded for now. Use transparent PNG/WebP cutouts, as in the design.
// width/height are the files' real pixel size (they only set the aspect ratio).
const items = [
  { src: "/images/about/bob.jpg", alt: "Vintage postcard", rotate: -3 },
  { src: "/images/about/child.jpg", alt: "Yellow floppy disk", rotate: 6 },
  { src: "/images/about/kid-mother.jpg", alt: "Polaroid of autumn leaves", rotate: 0 },
  { src: "/images/about/kids-door.jpeg", alt: "Torn photograph", rotate: -4 },
  { src: "/images/about/kora-3.jpg", alt: "Green vinyl record", rotate: 0 },
  { src: "/images/about/oliver.jpg", alt: "VHS tape", rotate: 2 },
];

const contactEmail = "mail@grainarchive.com";

export default function AboutPage() {
  return (
    <main className="bg-grain min-h-svh text-white [--grain-base:#161616]">
      {/* Title */}
      <h1 className="px-3 pt-32 text-center text-8xl font-black leading-none tracking-tighter sm:pt-40 sm:text-[11rem]">
        About
      </h1>

      {/* Marquee */}
      <section aria-label="Found objects" className="py-16 sm:py-24">
        <Marquee speed={40} pauseOnHover={true} className="overflow-y-hidden ">
          {items.map((item) => (
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt}
              width={400}
              height={300}
              className="h-54 w-auto max-w-none shrink-0 sm:h-72 mx-8"
              style={{ rotate: `${item.rotate}deg` }}
            />
          ))}
        </Marquee>
      </section>

      {/* Why this exists */}
      <section className="mx-auto grid max-w-5xl gap-3 px-5 pb-24 sm:pb-40 md:grid-cols-[240px_1fr]">
        <h2 className="text-base font-semibold">Why this exists</h2>
        <p className="text-base font-semibold leading-7">
          Grain Archive is a running record of the fuzz, fragments, and found
          moments in music, film, and visual culture. From washed-out shoegaze
          to sun-faded celluloid, we document the tones that don’t always get
          clean airtime. Not everything needs to be polished to mean something.
          Independently run by me, [Your Name], and updated at the mercy of
          mood, memory, and whatever’s looping at 3am.
        </p>
      </section>

      {/* Contact */}
      <section className="grid items-center gap-10 p-1.5 pb-16 md:grid-cols-2 md:gap-0">
        <div className="relative aspect-[5/4] w-full overflow-hidden rounded-lg">
          <Image
            src="/images/about/woman.jpg"
            alt="Woman’s face seen through two glasses of water"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="max-w-sm px-4 md:mx-auto md:px-0">
          <h2 className="text-lg font-semibold">Contact</h2>
          <p className="mt-6 text-base font-semibold leading-7">
            Got a dusty VHS, a lost record, or a film no one talks about?
          </p>
          <p className="mt-6 text-base font-semibold leading-7">
            Send recs, love letters, or questions to{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="underline underline-offset-2 hover:opacity-70"
            >
              {contactEmail}
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}