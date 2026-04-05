import { verifyAdmin, unauthorized } from "@/lib/admin-auth";
import fs from "fs";
import path from "path";

const IMAGES_DIR = path.resolve(process.cwd(), "public/images");
const PDFS_DIR = path.resolve(process.cwd(), "public/pdfs");

const ALLOWED_TYPES: Record<string, { dir: string; prefix: string; maxSize: number; defaultExt: string }> = {
  "image/": { dir: IMAGES_DIR, prefix: "/images/", maxSize: 5 * 1024 * 1024, defaultExt: ".jpg" },
  "application/pdf": { dir: PDFS_DIR, prefix: "/pdfs/", maxSize: 10 * 1024 * 1024, defaultExt: ".pdf" },
};

function getFileConfig(mimeType: string) {
  if (mimeType === "application/pdf") return ALLOWED_TYPES["application/pdf"];
  if (mimeType.startsWith("image/")) return ALLOWED_TYPES["image/"];
  return null;
}

export async function POST(request: Request) {
  if (!(await verifyAdmin())) return unauthorized();

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  const config = getFileConfig(file.type);
  if (!config) {
    return Response.json({ error: "File must be an image or PDF" }, { status: 400 });
  }

  if (file.size > config.maxSize) {
    const limitMB = config.maxSize / (1024 * 1024);
    return Response.json(
      { error: `File size must be under ${limitMB}MB` },
      { status: 400 }
    );
  }

  if (!fs.existsSync(config.dir)) {
    fs.mkdirSync(config.dir, { recursive: true });
  }

  // Generate a unique filename to avoid collisions
  const ext = path.extname(file.name) || config.defaultExt;
  const baseName = path
    .basename(file.name, ext)
    .replace(/[^\w-]/g, "_")
    .slice(0, 50);
  const timestamp = Date.now();
  const filename = `${baseName}_${timestamp}${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(config.dir, filename), buffer);

  return Response.json({ filename, path: `${config.prefix}${filename}` });
}
