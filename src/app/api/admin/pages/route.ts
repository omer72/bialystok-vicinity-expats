import { verifyAdmin, unauthorized } from "@/lib/admin-auth";
import {
  PAGES_DIR,
  writeFile,
  readFile,
  slugify,
} from "@/lib/admin-content";
import { pages } from "@/lib/pages";

export async function GET() {
  if (!(await verifyAdmin())) return unauthorized();

  const items = pages.map((p) => ({
    slug: p.slug,
    title: p.title,
    body: "",
  }));

  return Response.json(items);
}

export async function POST(request: Request) {
  if (!(await verifyAdmin())) return unauthorized();

  const { title, slug: providedSlug, body, frontmatter } = await request.json();

  if (!title) {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  const slug = providedSlug || slugify(title);

  if (readFile(PAGES_DIR, slug)) {
    return Response.json(
      { error: "A page with this slug already exists" },
      { status: 409 }
    );
  }

  const fm: Record<string, string> = {
    title,
    scraped_at: new Date().toISOString().split("T")[0],
    ...frontmatter,
  };

  writeFile(PAGES_DIR, slug, fm, body || "");

  return Response.json({ slug, title }, { status: 201 });
}
