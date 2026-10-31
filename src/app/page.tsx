import Image from "next/image";
import CategoryCards from "@/components/categories";
import ViewAll from "@/components/viewall";

export default function Home() {
  return (
    <main className="p-1.5">
      <section className="relative h-svh w-full overflow-hidden rounded-lg">
        <Image
          src="/images/3-faces.jpg"
          alt="Three women in colorful headwraps"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <h1 className="absolute inset-x-0 bottom-0">
          <Image
            src="/images/logo.svg"
            alt="Grain Archive"
            width={355}
            height={58}
            priority
            className="h-auto w-full"
          />
        </h1>
      </section>
      <CategoryCards />
      <ViewAll />
    </main>
  );
}

