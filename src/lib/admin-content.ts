import fs from "fs";
import path from "path";

const CONTENT_DIR = path.resolve(process.cwd(), "../../content");

export const BLOG_POSTS_DIR = path.join(CONTENT_DIR, "blog-posts");
export const EVENTS_DIR = path.join(CONTENT_DIR, "events");
export const PAGES_DIR = path.join(CONTENT_DIR, "pages");

export interface ContentFile {
  slug: string;
  frontmatter: Record<string, string>;
  body: string;
  raw: string;
}

export function parseFrontmatter(content: string): {
  frontmatter: Record<string, string>;
  body: string;
} {
  const frontmatter: Record<string, string> = {};

  if (!content.startsWith("---")) {
    return { frontmatter, body: content };
  }

  const endIndex = content.indexOf("---", 3);
  if (endIndex === -1) {
    return { frontmatter, body: content };
  }

  const fmBlock = content.slice(3, endIndex).trim();
  for (const line of fmBlock.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    frontmatter[key] = value;
  }

  const body = content.slice(endIndex + 3).trim();
  return { frontmatter, body };
}

export function buildMarkdown(
  frontmatter: Record<string, string>,
  body: string
): string {
  const fmLines = Object.entries(frontmatter).map(
    ([k, v]) => `${k}: "${v}"`
  );
  return `---\n${fmLines.join("\n")}\n---\n\n${body}\n`;
}

export function listFiles(dir: string): ContentFile[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      const { frontmatter, body } = parseFrontmatter(raw);
      return { slug, frontmatter, body, raw };
    });
}

export function readFile(dir: string, slug: string): ContentFile | null {
  const filePath = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { frontmatter, body } = parseFrontmatter(raw);
  return { slug, frontmatter, body, raw };
}

export function writeFile(
  dir: string,
  slug: string,
  frontmatter: Record<string, string>,
  body: string
): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = path.join(dir, `${slug}.md`);
  fs.writeFileSync(filePath, buildMarkdown(frontmatter, body), "utf-8");
}

export function deleteFile(dir: string, slug: string): boolean {
  const filePath = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return false;
  fs.unlinkSync(filePath);
  return true;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
