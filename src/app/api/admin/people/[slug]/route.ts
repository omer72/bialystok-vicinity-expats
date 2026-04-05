import { verifyAdmin, unauthorized } from "@/lib/admin-auth";
import { PAGES_DIR, readFile, writeFile, deleteFile } from "@/lib/admin-content";
import fs from "fs";
import path from "path";

const PEOPLE_DATA_PATH = path.resolve(process.cwd(), "src/lib/people.ts");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await verifyAdmin())) return unauthorized();

  const { slug } = await params;
  const { people } = await import("@/lib/people");
  const person = people.find((p) => p.slug === slug);

  if (!person) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const content = readFile(PAGES_DIR, person.contentSlug || slug);

  // Normalize images: support both legacy single `image` and new `images` array
  const fmImages = content?.frontmatter?.images;
  const fmImage = content?.frontmatter?.image;
  let images: string[] = [];
  if (Array.isArray(fmImages) && fmImages.length > 0) {
    images = fmImages as string[];
  } else if (person.image) {
    images = [person.image];
  } else if (typeof fmImage === 'string' && fmImage) {
    images = [fmImage];
  }

  const imageDisplayMode = (content?.frontmatter?.image_display_mode as string) || 'grid';

  return Response.json({
    ...person,
    images,
    imageDisplayMode,
    youtubeUrl: content?.frontmatter?.youtube_url || "",
    pdfUrl: content?.frontmatter?.pdf_url || "",
    body: content?.body || "",
    frontmatter: content?.frontmatter || {},
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await verifyAdmin())) return unauthorized();

  const { slug } = await params;
  const { people } = await import("@/lib/people");
  const person = people.find((p) => p.slug === slug);

  if (!person) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const { name, nameEn, description, image, images, imageDisplayMode, youtubeUrl, pdfUrl, body, frontmatter } =
    await request.json();

  // Update the markdown content file
  const contentSlug = person.contentSlug || slug;
  const existing = readFile(PAGES_DIR, contentSlug);
  const fm: Record<string, string | string[]> = {
    ...(existing?.frontmatter || {}),
    ...frontmatter,
  };
  if (name) fm.title = name;
  if (youtubeUrl !== undefined) {
    if (youtubeUrl) fm.youtube_url = youtubeUrl;
    else delete fm.youtube_url;
  }
  if (pdfUrl !== undefined) {
    if (pdfUrl) fm.pdf_url = pdfUrl;
    else delete fm.pdf_url;
  }

  // Handle images array
  const resolvedImages: string[] = images ?? (image ? [image] : []);
  if (resolvedImages.length > 0) {
    fm.images = resolvedImages;
    // Keep legacy image field as first image for backward compat
    fm.image = resolvedImages[0];
  } else {
    delete fm.images;
    delete fm.image;
  }
  if (imageDisplayMode) {
    fm.image_display_mode = imageDisplayMode;
  }

  writeFile(PAGES_DIR, contentSlug, fm, body ?? existing?.body ?? "");

  // Update people.ts entry
  const primaryImage = resolvedImages[0] || person.image || "";
  const peopleContent = fs.readFileSync(PEOPLE_DATA_PATH, "utf-8");
  const entryRegex = new RegExp(
    `(\\{[^}]*slug:\\s*'${slug}'[^}]*\\})`,
    "s"
  );
  const match = peopleContent.match(entryRegex);

  if (match) {
    const newEntry = `{\n    slug: '${slug}',\n    name: '${name || person.name}',\n    nameEn: '${nameEn || person.nameEn}',\n    description: '${((description || person.description) || "").replace(/'/g, "\\'")}',\n${primaryImage ? `    image: '${primaryImage}',\n` : ""}    contentSlug: '${contentSlug}',\n  }`;
    const updated = peopleContent.replace(entryRegex, newEntry);
    fs.writeFileSync(PEOPLE_DATA_PATH, updated, "utf-8");
  }

  return Response.json({ slug, name: name || person.name });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await verifyAdmin())) return unauthorized();

  const { slug } = await params;
  const { people } = await import("@/lib/people");
  const person = people.find((p) => p.slug === slug);

  if (!person) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  // Delete the content file
  const contentSlug = person.contentSlug || slug;
  deleteFile(PAGES_DIR, contentSlug);

  // Remove from people.ts array
  const peopleContent = fs.readFileSync(PEOPLE_DATA_PATH, "utf-8");
  const entryRegex = new RegExp(
    `\\s*\\{[^}]*slug:\\s*'${slug}'[^}]*\\},?`,
    "s"
  );
  const updated = peopleContent.replace(entryRegex, "");
  fs.writeFileSync(PEOPLE_DATA_PATH, updated, "utf-8");

  return Response.json({ deleted: true, slug });
}
