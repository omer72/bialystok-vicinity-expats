import { verifyAdmin, unauthorized } from "@/lib/admin-auth";
import fs from "fs";
import path from "path";

const IMAGES_DIR = path.resolve(process.cwd(), "public/images");

export async function POST(request: Request) {
  if (!(await verifyAdmin())) return unauthorized();

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return Response.json({ error: "File must be an image" }, { status: 400 });
  }

  // 5MB limit
  if (file.size > 5 * 1024 * 1024) {
    return Response.json(
      { error: "File size must be under 5MB" },
      { status: 400 }
    );
  }

  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  // Generate a unique filename to avoid collisions
  const ext = path.extname(file.name) || ".jpg";
  const baseName = path
    .basename(file.name, ext)
    .replace(/[^\w-]/g, "_")
    .slice(0, 50);
  const timestamp = Date.now();
  const filename = `${baseName}_${timestamp}${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(IMAGES_DIR, filename), buffer);

  return Response.json({ filename, path: `/images/${filename}` });
}
