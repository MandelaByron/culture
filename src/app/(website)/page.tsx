import Image from "next/image";
import CategoryCards from "@/components/categories";
import ViewAll from "@/components/viewall";
import FeaturedStory from "@/components/featurestory";
import BeautifulPeople from "@/components/beautiful_people";
import ImageBreak from "@/components/imagebreak";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <CategoryCards />
      <ViewAll />
      <FeaturedStory />
      <BeautifulPeople />
    </main>
  );
}

