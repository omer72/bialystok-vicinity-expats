import { verifyAdmin, unauthorized } from "@/lib/admin-auth";
import {
  BLOG_POSTS_DIR,
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
  const file = readFile(BLOG_POSTS_DIR, slug);

  if (!file) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({
    slug: file.slug,
    title: file.frontmatter.title || "",
    image: file.frontmatter.image || "",
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
  const existing = readFile(BLOG_POSTS_DIR, slug);

  if (!existing) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const { title, image, body, frontmatter } = await request.json();

  const fm: Record<string, string> = {
    ...existing.frontmatter,
    ...frontmatter,
  };
  if (title) fm.title = title;
  if (image !== undefined) {
    if (image) fm.image = image;
    else delete fm.image;
  }

  writeFile(BLOG_POSTS_DIR, slug, fm, body ?? existing.body);

  return Response.json({ slug, title: fm.title });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await verifyAdmin())) return unauthorized();

  const { slug } = await params;

  if (!deleteFile(BLOG_POSTS_DIR, slug)) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ deleted: true, slug });
}
