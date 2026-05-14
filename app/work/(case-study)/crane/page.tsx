import type { Metadata } from "next";
import Image from "next/image";
import { ArticleShell } from "@/components/article/ArticleShell";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Crane — case study",
  description:
    "A lightweight desktop capture utility built with Tauri, React, and TypeScript.",
};

export default function CranePage() {
  return (
    <ArticleShell
      kicker="Case study"
      title="Crane"
      tagline="A lightweight desktop capture utility — a global hotkey, a floating input, a searchable history of drops."
      meta={
        <div className="flex items-center gap-3">
          <Image
            src="/crane/bird.svg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span>Tauri · React · TypeScript</span>
        </div>
      }
      backHref="/work"
      backLabel="Back to work"
    >
      <Content />
    </ArticleShell>
  );
}
