import { verifyAdmin, unauthorized } from "@/lib/admin-auth";
import {
  PAGES_DIR,
  listFiles,
  writeFile,
  readFile,
  slugify,
} from "@/lib/admin-content";

export async function GET() {
  if (!(await verifyAdmin())) return unauthorized();

  const files = listFiles(PAGES_DIR);
  const pages = files.map((f) => ({
    slug: f.slug,
    title: f.frontmatter.title || "",
    body: f.body,
  }));

  return Response.json(pages);
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
