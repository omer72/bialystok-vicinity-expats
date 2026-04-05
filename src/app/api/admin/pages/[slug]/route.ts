import { verifyAdmin, unauthorized } from "@/lib/admin-auth";
import {
  PAGES_DIR,
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
  const file = readFile(PAGES_DIR, slug);

  if (!file) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({
    slug: file.slug,
    title: file.frontmatter.title || "",
    image: file.frontmatter.image || "",
    youtubeUrl: file.frontmatter.youtube_url || "",
    pdfUrl: file.frontmatter.pdf_url || "",
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
  const existing = readFile(PAGES_DIR, slug);

  if (!existing) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const { title, image, youtubeUrl, pdfUrl, body, frontmatter } = await request.json();

  const fm: Record<string, string> = {
    ...existing.frontmatter,
    ...frontmatter,
  };
  if (title) fm.title = title;
  fm.content_format = "html";
  if (image !== undefined) {
    if (image) fm.image = image;
    else delete fm.image;
  }
  if (youtubeUrl !== undefined) {
    if (youtubeUrl) fm.youtube_url = youtubeUrl;
    else delete fm.youtube_url;
  }
  if (pdfUrl !== undefined) {
    if (pdfUrl) fm.pdf_url = pdfUrl;
    else delete fm.pdf_url;
  }

  writeFile(PAGES_DIR, slug, fm, body ?? existing.body);

  return Response.json({ slug, title: fm.title });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await verifyAdmin())) return unauthorized();

  const { slug } = await params;

  if (!deleteFile(PAGES_DIR, slug)) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ deleted: true, slug });
}
