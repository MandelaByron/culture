
export type Story = {
    slug: string;
    title: string;
    category: string;
    /** ISO date, e.g. "2028-08-21" */
    date: string;
    image: string;
    alt: string;
  };
  
  // Hard-coded for now. Swap for a CMS / DB call later.
  export const stories: Story[] = [
    {
      slug: "african-americans-at-work",
      title: "African Americans at Work",
      category: "Photo",
      date: "2028-08-21",
      image: "/images/cards/work.jpg",
      alt: "Two women in uniforms with a toddler in a stroller on a tree-lined path",
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