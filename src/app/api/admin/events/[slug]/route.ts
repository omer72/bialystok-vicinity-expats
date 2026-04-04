import { verifyAdmin, unauthorized } from "@/lib/admin-auth";
import {
  EVENTS_DIR,
  readFile,
  writeFile,
  deleteFile,
} from "@/lib/admin-content";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await verifyAdmin())) return unauthorized();

  const { slug } = await params;
  const file = readFile(EVENTS_DIR, slug);

  if (!file) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({
    slug: file.slug,
    title: file.frontmatter.title || "",
    frontmatter: file.frontmatter,
    body: file.body,
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await verifyAdmin())) return unauthorized();

  const { slug } = await params;
  const existing = readFile(EVENTS_DIR, slug);

  if (!existing) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const { title, body, frontmatter } = await request.json();

  const fm: Record<string, string> = {
    ...existing.frontmatter,
    ...frontmatter,
  };
  if (title) fm.title = title;

  writeFile(EVENTS_DIR, slug, fm, body ?? existing.body);

  return Response.json({ slug, title: fm.title });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await verifyAdmin())) return unauthorized();

  const { slug } = await params;

  if (!deleteFile(EVENTS_DIR, slug)) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ deleted: true, slug });
}
