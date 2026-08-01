import Link from "next/link";
import type { Metadata } from "next";
import { getOpenJobPostings } from "@/lib/jobPostings";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open positions at FOCUS Finance S.A.",
  openGraph: { images: ["/og.png"] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default async function Home() {
  const jobs = await getOpenJobPostings();

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col gap-6 py-24 px-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Open positions
        </h1>

        {jobs.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400">
            No open positions right now.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {jobs.map((job) => (
              <li key={job.id}>
                <Link
                  href={`/jobs/${job.slug}`}
                  className="text-lg text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900 dark:text-white dark:decoration-slate-600 dark:hover:decoration-white"
                >
                  {job.title.trim()}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
