import { cache } from "react";

const HR_GRAPHQL_ENDPOINT = "https://hr.focusfinance.bi/graphql";

const OPEN_JOB_POSTINGS_QUERY = `
  query OpenJobPostings {
    jobPostings(status: OPEN) {
      id
      title
      department
      location
      employmentType
      closingDate
      publishedAt
      description
    }
  }
`;

export type JobPosting = {
  id: string;
  title: string;
  department: string | null;
  location: string | null;
  employmentType: string;
  closingDate: string | null;
  publishedAt: string | null;
  description: string;
};

export type JobPostingWithSlug = JobPosting & { slug: string };

function slugify(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function fetchOpenJobPostings(): Promise<JobPosting[]> {
  const res = await fetch(HR_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: OPEN_JOB_POSTINGS_QUERY }),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch job postings: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL error: ${json.errors[0]?.message ?? "unknown error"}`);
  }

  return json.data.jobPostings as JobPosting[];
}

// Slugs aren't provided by the API, so they're derived from the title.
// Cached per-build so every caller (page, metadata, opengraph-image) shares one fetch.
export const getOpenJobPostings = cache(async (): Promise<JobPostingWithSlug[]> => {
  const jobs = await fetchOpenJobPostings();
  const seen = new Set<string>();
  return jobs.map((job) => {
    let slug = slugify(job.title);
    if (seen.has(slug)) slug = `${slug}-${job.id.slice(0, 8)}`;
    seen.add(slug);
    return { ...job, slug };
  });
});

export async function getJobPostingBySlug(
  slug: string,
): Promise<JobPostingWithSlug | undefined> {
  const jobs = await getOpenJobPostings();
  return jobs.find((job) => job.slug === slug);
}

export function summarize(text: string, maxLength = 160): string {
  const collapsed = text.replace(/\s+/g, " ").trim();
  if (collapsed.length <= maxLength) return collapsed;
  return `${collapsed.slice(0, maxLength - 1).trimEnd()}…`;
}
