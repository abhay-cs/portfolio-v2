/**
 * Mirrors your LinkedIn experience. Update here when your profile changes;
 * the site does not fetch LinkedIn at runtime.
 */
export type ExperienceItem = {
  id: string;
  company: string;
  title: string;
  period: string;
  location?: string;
  highlights: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "naturalens",
    company: "Naturalens",
    title: "Software Engineer (Freelance contract)",
    period: "Feb 2026 – Present",
    location: "Winnipeg, Manitoba, Canada · Remote",
    highlights: [
      "Built a React Native field app that IDs wildlife offline — on-device YOLO, geo-tuned species packs, so the model only cares about animals that actually live where you're standing.",
      "Python + REST in the back for model versions and taxonomy — ship updates without breaking anyone mid-hike.",
    ],
  },
  {
    id: "network-kings",
    company: "Network kings",
    title: "Software Engineer",
    period: "Jun 2025 – Feb 2026",
    location: "Canada · Remote",
    highlights: [
      "Lifted the public site from WordPress to Framer — snappier pages, marketing could ship design tweaks without filing a dev ticket.",
      "Designed and built a Node.js / TypeScript + SQL student funnel for 10k+ learners — real schemas and APIs instead of ops living inside spreadsheets.",
    ],
  },
];
