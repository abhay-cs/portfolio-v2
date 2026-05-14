export type WritingPost = {
  date: string;
  title: string;
  /** TODO: Add slug + MDX route when you publish real posts */
  href?: string;
};

/** TODO: Replace with your real posts */
export const WRITING_POSTS: WritingPost[] = [
  { date: "2026-04-02", title: "Notes on calm interfaces" },
  { date: "2026-03-18", title: "Why I still reach for springs in motion" },
  { date: "2026-02-05", title: "Designing for one hand on the subway" },
];
