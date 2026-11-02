import type { Metadata } from "next";
import { StoryCards } from "@/components/storycard";
import { stories } from "@/lib/stories";

export const metadata: Metadata = {
  title: "Stories | Grain Archive",
  description: "Words, images, and signals from the edge",
};

export default function StoriesPage() {
  return (
    <main className="min-h-svh text-white">
      <h1 className="px-3 pb-32 pt-36 text-center font-serif text-7xl font-medium leading-none tracking-tight sm:pb-48 sm:pt-44 sm:text-9xl">
        Stories
      </h1>

      <StoryCards />
    </main>
  );
}