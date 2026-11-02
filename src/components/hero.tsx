import Image from "next/image";

type HeroProps = {
  src?: string;
  alt?: string;
  /** CSS object-position for the image, e.g. "center 30%" */
  position?: string;
};

export function Hero({
  src = "/images/3-faces.jpg",
  alt = "Three women in colorful headwraps",
  position = "center",
}: HeroProps) {
  return (
    <section className="p-1.5">
      <div className="relative h-svh w-full overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: position }}
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
      </div>
    </section>
  );
}

export default Hero;