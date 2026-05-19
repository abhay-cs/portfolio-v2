import type { Metadata } from "next";
import Image from "next/image";
import { ArticleShell } from "@/components/article/ArticleShell";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Crane — case study",
  description:
    "A native macOS capture utility — a floating pill behind ⌘⇧Space, a searchable history, and a menu-bar dashboard.",
};

export default function CranePage() {
  return (
    <ArticleShell
      kicker="Case study"
      title="Crane"
      tagline="Don't switch apps for a sentence in your head — a holding pen for the thoughts you catch mid-flow."
      meta={
        <div className="flex items-center gap-3">
          <Image
            src="/crane/app-icon.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-md"
          />
          <span>SwiftUI · SwiftData · AppKit</span>
        </div>
      }
      backHref="/work"
      backLabel="Back to work"
    >
      <Content />
    </ArticleShell>
  );
}
