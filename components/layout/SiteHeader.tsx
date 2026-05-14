import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-6 md:px-8">
      <Link href="/" className="flex items-center gap-3 text-ink">
        <span className="font-display text-lg tracking-tight">
          {/* TODO: Short monogram or site title */}
          byabhay.com
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <nav className="flex flex-wrap items-center justify-end gap-1 rounded-full bg-ink/[0.03] p-1 text-sm text-ink/75 ring-1 ring-ink/5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 transition-colors hover:bg-ink/[0.04] hover:text-ink hover:shadow-sm dark:hover:bg-white/10"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
