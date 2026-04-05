import fs from "fs";
import path from "path";

const CONTENT_DIR = path.resolve(process.cwd(), "../../content");
const PAGES_DIR = path.join(CONTENT_DIR, "pages");
const BLOG_POSTS_DIR = path.join(CONTENT_DIR, "blog-posts");

/** Navigation boilerplate lines that appear on scraped pages */
const NAV_BOILERPLATE = [
  "צור קשר",
  "אתרים קשורים",
  "אירועים",
  "All Posts",
  "חיפוש",
  "פוסטים אחרונים",
  "הצג הכול",
  "תגובות",
  "כתיבת תגובה...",
  "Post: Blog2_Post",
];

/** Common navigation images that appear across all blog posts */
const NAV_IMAGE_IDS = [
  "be8555_65d63e2d89f0471c8137cbf06fc41605_mv2.jpg",
  "be8555_71a366cb4e894b75970e52f33cbb5d41_mv2.jpg",
];

interface PageContent {
  title: string;
  body: string[];
  images: string[];
  youtubeUrl?: string;
  pdfUrl?: string;
}

interface BlogContent {
  title: string;
  body: string[];
  images: string[];
  date: string;
  author: string;
}

/**
 * Extract the media ID from a Wix static URL and convert it to a local filename.
 * URLs contain media IDs like `15df41_xxx~mv2.jpg` (with `~` or `%7E`),
 * which correspond to files named `15df41_xxx_mv2.jpg` in `/public/images/`.
 */
function extractMediaFilename(url: string): string | null {
  // Match the media ID part from wixstatic URLs
  // Examples:
  //   .../media/15df41_2ded3f58810c403e9cf7b6d618b5e5fc~mv2.jpg/v1/...
  //   .../media/5eeb4e_239e04824a6f4de7b786207926ebc547%7Emv2.jpeg/v1/...
  //   .../media/23fd2a2be53141ed810f4d3dcdcd01fa.png/v1/...
  const match = url.match(
    /wixstatic\.com\/media\/([^/]+)\.(png|jpg|jpeg|gif|webp)/i
  );
  if (!match) return null;

  let mediaId = match[1];
  const extension = match[2];

  // Decode URL encoding (%7E -> ~) then replace ~ with _
  mediaId = decodeURIComponent(mediaId).replace(/~/g, "_");

  return `${mediaId}.${extension}`;
}

/**
 * Extract unique, relevant image filenames from markdown content.
 * Filters out tiny icons and common nav images.
 */
function extractImages(content: string): string[] {
  const imageUrls: string[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("- https://static.wixstatic.com")) continue;

    const url = trimmed.slice(2).trim(); // Remove "- " prefix

    // Filter out tiny icons (w_20 or w_40)
    if (/w_20[,/]/.test(url) || /w_40[,/]/.test(url)) continue;

    imageUrls.push(url);
  }

  // Convert to local filenames, deduplicate, and filter nav images
  const seen = new Set<string>();
  const result: string[] = [];

  for (const url of imageUrls) {
    const filename = extractMediaFilename(url);
    if (!filename) continue;
    if (seen.has(filename)) continue;
    if (NAV_IMAGE_IDS.includes(filename)) continue;

    seen.add(filename);
    result.push(filename);
  }

  return result;
}

/**
 * Parse YAML frontmatter and return { frontmatter, body }.
 */
function parseFrontmatter(content: string): {
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
    // Remove surrounding quotes
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

/**
 * Clean the body text: remove nav boilerplate, title, image URLs, blockquotes,
 * and footer. Return an array of non-empty content paragraphs.
 */
function cleanBody(body: string): string[] {
  const lines = body.split("\n");
  const cleaned: string[] = [];
  let foundContent = false;
  let pastNavSection = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines (we'll handle paragraph separation later)
    if (trimmed === "") continue;

    // Skip blockquote header (site name that appears at top of pages)
    if (trimmed.startsWith("> ")) continue;

    // Skip H1 title line (rendered separately)
    if (trimmed.startsWith("# ")) continue;

    // Skip image URL lines
    if (trimmed.startsWith("- https://static.wixstatic.com")) continue;

    // Skip the "## Images" heading
    if (trimmed === "## Images") continue;

    // Skip navigation boilerplate lines
    if (NAV_BOILERPLATE.includes(trimmed)) continue;

    // Skip footer line
    if (trimmed.startsWith("©") || trimmed.includes("Proudly created")) continue;

    // Skip blog post nav items that are just other post titles
    // These appear after "פוסטים אחרונים" and "הצג הכול"

    // Skip common page header items (site sections appearing before content)
    if (
      !pastNavSection &&
      (trimmed === "ביאליסטוק" ||
        trimmed === "יהוד" ||
        trimmed === "זיכרון" ||
        trimmed === "ישראל" ||
        trimmed === "About: About Us")
    ) {
      continue;
    }

    // Skip author handle lines (like "ron-london")
    if (/^[a-z]+-[a-z]+$/.test(trimmed) && !foundContent) continue;

    // Skip "reading time" lines
    if (trimmed.startsWith("זמן קריאה")) continue;

    // Skip "updated" label
    if (trimmed === "עודכן:") continue;

    // Once we see real content, mark it
    if (!foundContent) {
      // Skip date-like lines at the top of blog posts before content
      if (/^\d{1,2}\s+ב[א-ת]+\s+\d{4}$/.test(trimmed)) continue;

      // Check if this looks like actual content (not nav)
      if (trimmed.length > 0) {
        foundContent = true;
        pastNavSection = true;
      }
    }

    // Stop at "פוסטים אחרונים" (recent posts) section in blog posts
    if (trimmed === "פוסטים אחרונים") break;

    // Stop at footer
    if (trimmed.startsWith("©")) break;

    if (foundContent) {
      cleaned.push(trimmed);
    }
  }

  return cleaned;
}

/**
 * Extract the date from a blog post body.
 * Dates appear in the format "12 במאי 2024" after the nav boilerplate.
 */
function extractBlogDate(body: string): string {
  const datePattern = /^(\d{1,2}\s+ב[א-ת'׳]+\s+\d{4})/m;
  const match = body.match(datePattern);
  return match ? match[1] : "";
}

/**
 * Extract the author from a blog post body.
 * Author handle appears as a single lowercase-with-dashes line (e.g., "ron-london").
 */
function extractBlogAuthor(body: string): string {
  const lines = body.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (/^[a-z]+-[a-z]+$/.test(trimmed)) {
      return trimmed;
    }
  }
  return "";
}

/**
 * Read a markdown file and return its raw content, or null if not found.
 */
function readMarkdownFile(dir: string, slug: string): string | null {
  const filePath = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

/**
 * Get content for a page file.
 * Returns { title, body, images } or null if not found.
 */
export function getPageContent(
  slug: string
): PageContent | null {
  const raw = readMarkdownFile(PAGES_DIR, slug);
  if (!raw) return null;

  const { frontmatter, body } = parseFrontmatter(raw);
  const title = frontmatter.title || "";
  const images = extractImages(raw);
  const bodyParagraphs = cleanBody(body);

  const youtubeUrl = frontmatter.youtube_url || undefined;
  const pdfUrl = frontmatter.pdf_url || undefined;

  return { title, body: bodyParagraphs, images, youtubeUrl, pdfUrl };
}

/**
 * Get content for a blog post.
 * Returns { title, body, images, date, author } or null if not found.
 */
export function getBlogContent(
  slug: string
): BlogContent | null {
  const raw = readMarkdownFile(BLOG_POSTS_DIR, slug);
  if (!raw) return null;

  const { frontmatter, body } = parseFrontmatter(raw);
  const title = frontmatter.title || "";
  const images = extractImages(raw);
  const date = extractBlogDate(body);
  const author = extractBlogAuthor(body);
  const bodyParagraphs = cleanBody(body);

  return { title, body: bodyParagraphs, images, date, author };
}

/**
 * Get content for a famous person page (from pages directory).
 * Returns { title, body, images } or null if not found.
 */
export function getPersonContent(
  slug: string
): PageContent | null {
  return getPageContent(slug);
}
