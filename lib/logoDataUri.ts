import { readFileSync } from "node:fs";
import { join } from "node:path";

let cached: string | undefined;

// Reading the logo from disk (instead of fetching it over HTTP) means OG
// image generation doesn't depend on the site being deployed/reachable.
export function getLogoDataUri(): string {
  if (!cached) {
    const bytes = readFileSync(join(process.cwd(), "public", "focus-icon.png"));
    cached = `data:image/png;base64,${bytes.toString("base64")}`;
  }
  return cached;
}
