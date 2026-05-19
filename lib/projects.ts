export type ProjectTag = "web" | "app" | "experiment";

export type Project = {
  id: string;
  name: string;
  /** TODO: Replace with your real stack */
  stack: string[];
  /** TODO: Replace with your real summary */
  description: string;
  /** TODO: Point to deployed project or repo */
  href: string;
  tags: ProjectTag[];
  /** Optional in-site case study route. When present, the card links here. */
  caseStudyHref?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "crane",
    name: "Crane",
    stack: ["SwiftUI", "SwiftData", "AppKit"],
    description:
      "A floating capture bar behind ⌘⇧Space — type a thought, hit Enter, get back to your editor in ~2 seconds.",
    href: "https://crane.byabhay.com/",
    tags: ["app", "experiment"],
    caseStudyHref: "/work/crane",
  },
  {
    id: "dispatchiq",
    name: "DispatchIQ",
    stack: ["Python", "Go", "Redis", "PostgreSQL", "Kafka"],
    description:
      "A distributed job queue I'm building — Python prototype first, then a Go rewrite. Priority queues, retries with backoff, idempotency, event bus, observability.",
    href: "https://github.com/abhay-cs/dispatchiq",
    tags: ["app", "experiment"],
    caseStudyHref: "/work/dispatchiq",
  },
];
