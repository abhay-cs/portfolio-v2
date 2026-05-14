"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { HomeMeta } from "@/components/home/HomeMeta";
import { FadeTagline, TypewriterName } from "@/components/hero/TypewriterName";
// Re-add when re-enabling the avatar circle:
// import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function HomeHero() {
  const [typed, setTyped] = useState(false);
  const onNameDone = useCallback(() => setTyped(true), []);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:px-8 md:pb-24">
      <div className="flex items-start justify-between gap-6 md:gap-10">
        <div className="max-w-2xl flex-1">
          <div className="flex items-center gap-5 md:gap-6">
            {/*
            <ScrollReveal>
              <div
                className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-cream font-display text-5xl text-ink shadow-sm md:h-32 md:w-32 md:text-7xl"
                aria-label="Abhay"
              >
                A
              </div>
            </ScrollReveal>
            */}
            <h1 className="font-display text-4xl text-ink md:text-6xl">
              <TypewriterName
                /* TODO: Replace with your name */
                fullName="Abhay"
                onComplete={onNameDone}
              />
            </h1>
          </div>
          <FadeTagline show={typed}>
            {/* TODO: One-line positioning statement */}
            I can use a computer.
          </FadeTagline>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link
              href="/work"
              className="rounded-full bg-accent/10 px-5 py-2 text-accent transition-colors hover:bg-accent/15"
            >
              View work
            </Link>
          </div>

          <HomeMeta />
        </div>

        <Image
          src="/hello-mac.png"
          alt="Pixel-art Macintosh saying hello"
          width={480}
          height={480}
          priority
          unoptimized
          className="h-36 w-36 shrink-0 select-none [image-rendering:pixelated] sm:h-44 sm:w-44 md:h-64 md:w-64 lg:h-72 lg:w-72"
        />
      </div>
      {/*
      <ScrollReveal className="mt-24 max-w-3xl">
        <SectionHeading
          as="h2"
          className="font-display text-3xl text-ink md:text-4xl"
          text="Craft calm surfaces"
        />
        <p className="mt-4 text-lg text-ink/80">
          
          I design and build interfaces that feel paper-close: legible typography, generous spacing,
          and motion that obeys the same springs everywhere.
        </p>
      </ScrollReveal>
      */}
    </section>
  );
}
