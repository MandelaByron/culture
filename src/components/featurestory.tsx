import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

// Hard-coded for now. Swap for a CMS / DB call later.
const story = {
  slug: "what-the-hands-remember",
  title: "What the Hands Remember",
  image: "/images/story.jpg",
  alt: "Two workers in a factory, black and white photograph",
  background: "/images/texture-2.jpg",
};

export function FeaturedStory() {
  return (
    <section className="p-1.5">
      <div className="relative flex min-h-[560px] flex-col overflow-hidden rounded-lg bg-[#161616] text-white sm:min-h-[720px]">
        {/* Background texture */}
        <Image
          src={story.background}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-60"
          aria-hidden
        />

        <div className="relative flex flex-1 flex-col px-3 pb-12 pt-4 sm:px-6">
          <h2 className="font-serif text-5xl font-medium leading-none tracking-tight sm:text-7xl lg:text-8xl">
            Featured Story
          </h2>

          <div className="grid flex-1 grid-cols-2 items-center gap-6 pt-12 sm:gap-12 sm:px-12">
            <div className="relative aspect-square w-full">
              <Image
                src={story.image}
                alt={story.alt}
                fill
                sizes="(min-width: 640px) 40vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
              <h3 className="font-serif text-3xl leading-tight sm:text-5xl lg:text-6xl">
                {story.title}
              </h3>
              <Link
                href={`/archive/${story.slug}`}
                className="inline-flex items-center gap-1.5 text-[10px] underline-offset-4 hover:underline sm:text-sm"
              >
                <Play className="size-2 fill-current sm:size-3" />
                Dive In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedStory;