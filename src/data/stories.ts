export interface Story {
  slug: string;
  number: string;
  title: string;
  place: string;
  season: string;
  dek: string;
  coverFilename: string;
  coverRatio?: string;
  photoSlug?: string; // linked photograph
  readingMinutes: number;
  body: string[]; // paragraphs
}

export const stories: Story[] = [
  {
    slug: "dinner-is-served",
    number: "Nº 07",
    title: "Dinner Is Served",
    place: "Sonoran Desert",
    season: "Spring",
    dek: "On the twenty-minute call of a hungry roadrunner chick, and the parent that answered.",
    coverFilename: "story-07.jpg",
    coverRatio: "aspect-[4/3]",
    photoSlug: "roadrunner-dinner",
    readingMinutes: 6,
    body: [
      "Some wildlife moments last only a fraction of a second. Others require hours of patience. This one asked for both.",
      "I had marked the nest two weeks earlier without ever getting closer than eighty yards. It was tucked into the arms of a cholla the size of a small car, invisible from every angle except one narrow line of sight that ran between two mesquites.",
      "The chick had a voice like a rusty gate. When the parent came back — every ninety minutes or so — it would call as if the world were ending. The desert would fall silent around it, in the way that only a desert can, and then the answer would come: a soft, dry click that seemed to arrive from every direction at once.",
      "This frame is the exchange itself. A lizard as long as the chick was, hanging in the air between two open beaks, held for perhaps a fifth of a second. The chick swallowed it whole. It looked, for a moment, like a small dinosaur that had made a terrible mistake.",
      "There is a lesson in this picture that I keep coming back to. The most extraordinary things in nature almost never happen where we expect them to. They happen quietly, off the trail, at the exact moment we have almost decided to leave.",
    ],
  },
  {
    slug: "the-run",
    number: "Nº 06",
    title: "The Run",
    place: "Coastal Alaska",
    season: "Autumn",
    dek: "A single week each autumn draws bears and salmon into a rhythm older than memory.",
    coverFilename: "story-06.jpg",
    coverRatio: "aspect-[4/3]",
    photoSlug: "grizzly-salmon-run",
    readingMinutes: 8,
    body: [
      "The salmon arrive first, in a pulse so sudden the river seems to change colour overnight.",
      "The bears follow within hours. Some come alone. Some come with cubs. All of them come with an intensity that is almost embarrassing to witness — like walking in on someone praying.",
      "For a single week each year, everything else in their lives stops. They eat, they sleep on the bank, they eat again. By the end of the week, some of them will have gained sixty pounds.",
      "The image is of a young male who caught nine fish in ten minutes. He ate three of them. The rest, he left on the bank for the gulls, who circled him like tiny, screaming acolytes.",
    ],
  },
  {
    slug: "kinship-in-snow",
    number: "Nº 05",
    title: "Kinship in Snow",
    place: "Boreal North",
    season: "Winter",
    dek: "What two wolves say to each other, without a sound, in the middle of a winter forest.",
    coverFilename: "story-05.jpg",
    coverRatio: "aspect-[4/3]",
    photoSlug: "wolves-winter",
    readingMinutes: 7,
    body: [
      "They came from opposite directions, along the same frozen creek, and met exactly in the middle.",
      "For a full minute they stood nose to nose, saying nothing that a human ear could hear. Their breath rose in a single cloud between them.",
      "Then, without any signal I could detect, they turned and walked together back the way one of them had come. As if the meeting had settled something. As if there had been a decision.",
    ],
  },
  {
    slug: "last-of-the-herd",
    number: "Nº 04",
    title: "Last of the Herd",
    place: "Great Plains",
    season: "Summer",
    dek: "The bison were nearly lost. Their return is the quietest conservation story of our time.",
    coverFilename: "story-04.jpg",
    coverRatio: "aspect-[4/3]",
    photoSlug: "bison-silhouette",
    readingMinutes: 9,
    body: [
      "By 1889, there were fewer than a thousand American bison left alive. From something like thirty million.",
      "The story of how we brought them back is one of ranchers and native nations and a handful of unlikely alliances. It is not a clean story. But it is one of the great conservation stories of the last century, and almost no one tells it.",
      "This bull walks alone across restored prairie in Montana — land that was farmed, then abandoned, then bought and given back to grass. His ancestors nearly vanished from exactly this ground.",
    ],
  },
  {
    slug: "first-light",
    number: "Nº 03",
    title: "First Light",
    place: "East Africa",
    season: "Dry",
    dek: "On tracking an elephant matriarch across a plain at the edge of dawn.",
    coverFilename: "story-03.jpg",
    coverRatio: "aspect-[4/3]",
    photoSlug: "elephant-matriarch",
    readingMinutes: 10,
    body: [
      "Her name is Nasha. She is fifty-two years old and she has led her family for the last twenty of them.",
      "We tracked her family for four mornings before this frame arrived. Every day we would rise at 4:30 and be in position by 5:15. Every day the light would arrive first, and the elephants would arrive whenever they arrived.",
      "On the fifth morning, she brought them out onto the pan just as the sun crested. Seventeen animals, in a single line, walking with a purpose only she understood.",
    ],
  },
];

export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}
