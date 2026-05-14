import { EDUCATION } from "@/lib/education";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, mailtoHref } from "@/lib/siteContact";

export function HomeMeta() {
  return (
    <div className="mt-8 space-y-5">
      <div className="inline-flex w-full max-w-md flex-col gap-1 rounded-2xl border border-ink/10 bg-ink/[0.02] px-4 py-3 sm:w-auto">
        <p className="text-sm font-medium text-ink/90">{EDUCATION.school}</p>
        <p className="text-sm text-ink/75">{EDUCATION.degree}</p>
        <p className="text-xs text-ink/55">
          {EDUCATION.years}
          {EDUCATION.location ? ` · ${EDUCATION.location}` : ""}
        </p>
      </div>

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
          className="break-all rounded-full border border-ink/15 px-4 py-2 text-ink transition-colors hover:border-accent/40 hover:bg-ink/[0.03] sm:break-normal"
          aria-label={`Email ${EMAIL}`}
        >
          {EMAIL}
        </a>
      </div>
    </div>
  );
}
