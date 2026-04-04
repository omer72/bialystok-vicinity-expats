import { verifyAdmin, unauthorized } from "@/lib/admin-auth";
import { PAGES_DIR, listFiles, writeFile, readFile, slugify } from "@/lib/admin-content";
import fs from "fs";
import path from "path";

const PEOPLE_DATA_PATH = path.resolve(process.cwd(), "src/lib/people.ts");

export async function GET() {
  if (!(await verifyAdmin())) return unauthorized();

  // Return all people from the data array by reading the TS file
  const { people } = await import("@/lib/people");
  return Response.json(people);
}

export async function POST(request: Request) {
  if (!(await verifyAdmin())) return unauthorized();

  const { name, nameEn, description, slug: providedSlug, image, body } =
    await request.json();

  if (!name || !nameEn) {
    return Response.json(
      { error: "name and nameEn are required" },
      { status: 400 }
    );
  }

  const slug = providedSlug || slugify(nameEn);
  const contentSlug = slug;

  if (readFile(PAGES_DIR, contentSlug)) {
    return Response.json(
      { error: "A page with this slug already exists" },
      { status: 409 }
    );
  }

  // Write the content markdown file
  const fm: Record<string, string> = {
    title: name,
    scraped_at: new Date().toISOString().split("T")[0],
  };
  writeFile(PAGES_DIR, contentSlug, fm, body || `# ${name}\n`);

  // Append to people.ts data array
  const newEntry = `  {\n    slug: '${slug}',\n    name: '${name}',\n    nameEn: '${nameEn}',\n    description: '${(description || "").replace(/'/g, "\\'")}',\n${image ? `    image: '${image}',\n` : ""}    contentSlug: '${contentSlug}',\n  },`;

  const peopleContent = fs.readFileSync(PEOPLE_DATA_PATH, "utf-8");
  const updated = peopleContent.replace(
    /];\s*$/,
    `${newEntry}\n];\n`
  );
  fs.writeFileSync(PEOPLE_DATA_PATH, updated, "utf-8");

  return Response.json({ slug, name, nameEn }, { status: 201 });
}
