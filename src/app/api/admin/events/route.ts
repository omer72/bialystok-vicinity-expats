import { verifyAdmin, unauthorized } from "@/lib/admin-auth";
import {
  EVENTS_DIR,
  writeFile,
  readFile,
  slugify,
} from "@/lib/admin-content";
import { events } from "@/lib/events";

export async function GET() {
  if (!(await verifyAdmin())) return unauthorized();

  const items = events.map((e) => ({
    slug: e.slug,
    title: e.title,
    body: "",
  }));

  return Response.json(items);
}

export async function POST(request: Request) {
  if (!(await verifyAdmin())) return unauthorized();

  const { title, slug: providedSlug, image, body, frontmatter } = await request.json();

  if (!title) {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  const slug = providedSlug || slugify(title);

  if (readFile(EVENTS_DIR, slug)) {
    return Response.json(
      { error: "An event with this slug already exists" },
      { status: 409 }
    );
  }

  const fm: Record<string, string> = {
    title,
    scraped_at: new Date().toISOString().split("T")[0],
    ...frontmatter,
  };
  if (image) fm.image = image;

  writeFile(EVENTS_DIR, slug, fm, body || "");

  return Response.json({ slug, title }, { status: 201 });
}
