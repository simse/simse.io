import type { APIContext } from "astro";

export const prerender = false;

// This is a catch-all route that redirects to the CMS, since Sanity Studio is client-side only
export async function GET({ redirect }: APIContext) {
  return redirect("/cms");
}
