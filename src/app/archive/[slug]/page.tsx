import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
//import CategoryCards from "@/components/category-cards";
import { StoryFigure } from "@/components/storyfigure";
import { formatDate, stories } from "@/lib/detail-stories";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata(
  props: PageProps<"/archive/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) return {};

  return {
    title: `${story.title} | Grain Archive`,
    description: story.intro,
  };
}

export default async function StoryPage(props: PageProps<"/archive/[slug]">) {
  const { slug } = await props.params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) notFound();

  const hero = story.hero ?? { image: story.image, alt: story.alt };
  const meta = `${story.category} · ${formatDate(story.date)}`;
  const more = stories.filter((s) => s.slug !== story.slug).slice(0, 4);

  return (
    <main className="bg-grain min-h-svh text-white [--grain-base:#161616]">
      {/* Title */}
      <h1 className="mx-auto max-w-5xl text-balance px-3 pb-24 pt-36 text-center font-serif text-6xl font-medium leading-none tracking-tight sm:pb-44 sm:pt-44 sm:text-8xl">
        {story.title}
      </h1>

      {/* Hero image */}
      <section className="p-1.5">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg sm:aspect-[2/1]">
          <Image
            src={hero.image}
            alt={hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Intro */}
      {story.intro && (
        <section className="grid gap-3 px-5 py-20 sm:py-28 md:grid-cols-[240px_1fr]">
          <h2 className="font-serif text-sm font-bold">Intro</h2>
          <p className="font-serif text-base font-bold leading-7">
            {story.intro}
          </p>
        </section>
      )}

      {/* Figures */}
      {story.figures?.map((figure) => (
        <StoryFigure
          key={figure.image}
          image={figure.image}
          alt={figure.alt}
          title={story.title}
          meta={meta}
        />
      ))}

      {/* More stories */}
      {/* <CategoryCards items={more} /> */}
    </main>
  );
}