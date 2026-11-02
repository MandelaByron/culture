export type StoryImage = {
    image: string;
    alt: string;
  };
  
export type Story = {
slug: string;
title: string;
category: string;
/** ISO date, e.g. "2028-08-21" */
date: string;
/** Card image */
image: string;
alt: string;
/** Detail page fields. Optional: the page falls back to the card image. */
hero?: StoryImage;
intro?: string;
figures?: StoryImage[];
};
  
  // Hard-coded for now. Swap for a CMS / DB call later.
  export const stories: Story[] = [
    {
      slug: "african-americans-at-work",
      title: "African Americans at Work",
      category: "Photo",
      date: "2028-08-21",
      image: "/images/stories/2011_155_55_001.jpg",
      alt: "Two women in uniforms with a toddler in a stroller on a tree-lined path",
      hero: {
        image: "/images/stories/2020_10_12_001.jpg",
        alt: "Barbershop interior with barbers, customers and onlookers, early photograph",
      },
      intro:
        "Some films unfold like a sigh, a foggy recollection that refuses to resolve. They’re not about plot—they’re about feeling. Drifting films aren’t slow for the sake of slowness, but because they prioritize atmosphere over action. Here, narrative loosens, time dilates, and everything becomes suspended. In this piece, we wander through the cinematic landscapes that drift on purpose—and the directors who shape emotion through stillness, repetition, and open space.",
      figures: [
        {
          image: "/images/stories/2016_166_22_001.jpg",
          alt: "Men in striped uniforms holding tin plates beside a railway cutting, historical photograph",
        },
        {
            image: "/images/stories/2016_166_31_1_001.jpg",
            alt: "Men in striped uniforms holding tin plates beside a railway cutting, historical photograph",
        },
        {
            image: "/images/stories/2007_1_69_15_10_C_001_0.jpg",
            alt: "Women dressing hair"
        }
      ],
    },
    {
      slug: "drowning-in-delay",
      title: "Drowning in Delay: The Revival of Fuzz Worship",
      category: "Essay",
      date: "2028-08-06",
      image: "/images/cards/delay.jpg",
      alt: "Person lying in tall grass with a paper bag over their head",
    },
    {
      slug: "color-repetition",
      title: "Color, Repetition and Memory",
      category: "Film",
      date: "2028-07-11",
      image: "/images/cards/color.jpg",
      alt: "Black and white portrait of a man in a suit",
    },
    {
      slug: "visual-culture",
      title: "The Natural Aesthetic of Visual Culture",
      category: "Photo",
      date: "2028-06-30",
      image: "/images/cards/culture.jpg",
      alt: "Portrait of a young woman with natural hair",
    },
  ];
  
  export const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC", // avoids server/client hydration mismatch
    });