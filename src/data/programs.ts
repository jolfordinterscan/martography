export interface Program {
  slug: string;
  title: string;
  audience: string;
  format: string;
  summary: string;
  detail: string[];
}

export const programs: Program[] = [
  {
    slug: "school-programs",
    title: "School Programs",
    audience: "K–12 · Assemblies · Classroom",
    format: "45–90 minutes · in-person or virtual",
    summary:
      "Wildlife storytelling designed to spark curiosity — brought into classrooms, libraries, and nature centers.",
    detail: [
      "Each program is built around a single species and a single story from the field. Students see the frames, hear the process, and are guided through what it took to make the image ethically.",
      "Curriculum-aligned worksheets and follow-up materials are provided for teachers on request.",
    ],
  },
  {
    slug: "speaking-engagements",
    title: "Speaking Engagements",
    audience: "Camera Clubs · Universities · Corporate",
    format: "45–75 minute keynote · optional Q&A",
    summary:
      "Talks on photography, patience, and conservation for camera clubs, universities, and corporate audiences.",
    detail: [
      "Talks are always story-first — the craft and the conservation are woven through, never lectured.",
      "Signature topics: Every Photograph Has a Story · The Ethics of Wild Places · Photography as a Form of Attention.",
    ],
  },
  {
    slug: "conservation-partnerships",
    title: "Conservation Partnerships",
    audience: "Nonprofits · Land Trusts · Research Groups",
    format: "Image licensing · long-form storytelling · campaign work",
    summary:
      "Image licensing, campaign work, and long-form storytelling in partnership with mission-aligned organizations.",
    detail: [
      "Selected past and current partners work in habitat restoration, species monitoring, and public-land advocacy across North America and East Africa.",
      "New partnerships are considered case by case. Please write with a short description of the work and the story you would like to tell.",
    ],
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
