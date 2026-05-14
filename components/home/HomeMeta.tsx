import { EDUCATION } from "@/lib/education";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, mailtoHref } from "@/lib/siteContact";

export function HomeMeta() {
  return (
    <div className="mt-8 space-y-5">
      <p className="text-sm text-ink/75">
        <span className="rounded-full border border-ink/10 bg-ink/[0.02] px-3 py-1.5 text-ink/85">
          {EDUCATION.school} — {EDUCATION.degree}
        </span>
        <span className="mt-2 block text-ink/60">
          {EDUCATION.years}
          {EDUCATION.location ? ` · ${EDUCATION.location}` : ""}
        </span>
      </p>

      <div className="flex flex-wrap gap-2 text-sm">
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink/15 px-4 py-2 text-ink transition-colors hover:border-accent/40 hover:bg-ink/[0.03]"
        >
          LinkedIn
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink/15 px-4 py-2 text-ink transition-colors hover:border-accent/40 hover:bg-ink/[0.03]"
        >
          GitHub
        </a>
        <a
          href={mailtoHref()}
          className="rounded-full border border-ink/15 px-4 py-2 text-ink transition-colors hover:border-accent/40 hover:bg-ink/[0.03]"
          aria-label={`Email ${EMAIL}`}
        >
          {EMAIL}
        </a>
      </div>
    </div>
  );
}
