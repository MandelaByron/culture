import Image from "next/image";

type Photo = {
  src: string;
  alt: string;
  /** Spans two columns (the wide tile) */
  wide?: boolean;
};

// Hard-coded for now. Swap for a CMS / DB call later.
const photos: Photo[] = [
  {
    src: "/images/people/1.jpg",
    alt: "Black and white portrait of a woman wearing a cowrie shell headpiece",
  },
  {
    src: "/images/people/2.jpg",
    alt: "Portrait of a young man in a dark tank top",
  },
  {
    src: "/images/people/3.jpg",
    alt: "Woman with her hand in her hair, eyes closed",
  },
  {
    src: "/images/people/4.jpg",
    alt: "Black and white photo of a laughing child holding a lamb",
  },
  {
    src: "/images/people/5.jpg",
    alt: "Group of people in traditional attire with coral beads",
    wide: true,
  },
];

export function BeautifulPeople() {
  return (
    <section className="p-1.5">
      <div className="rounded-lg bg-slate-50 p-3 text-black sm:p-4">
        <h2 className="mb-6 font-serif text-5xl font-medium leading-none tracking-tight sm:mb-8 sm:text-7xl lg:text-8xl">
          Beautiful People
        </h2>

        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className={
                photo.wide
                  ? "relative col-span-2 aspect-[2/1] overflow-hidden rounded-md sm:aspect-auto"
                  : "relative aspect-square overflow-hidden rounded-md"
              }
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={
                  photo.wide
                    ? "(min-width: 640px) 66vw, 100vw"
                    : "(min-width: 640px) 33vw, 50vw"
                }
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BeautifulPeople;