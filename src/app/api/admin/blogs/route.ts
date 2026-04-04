import { verifyAdmin, unauthorized } from "@/lib/admin-auth";
import {
  BLOG_POSTS_DIR,
  writeFile,
  readFile,
  slugify,
} from "@/lib/admin-content";
import { blogPosts } from "@/lib/blog";

export async function GET() {
  if (!(await verifyAdmin())) return unauthorized();

  const posts = blogPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    type: "blog-post",
    body: "",
  }));

  return Response.json(posts);
}

export async function POST(request: Request) {
  if (!(await verifyAdmin())) return unauthorized();

  const { title, slug: providedSlug, body, frontmatter } = await request.json();

  if (!title) {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  const slug = providedSlug || slugify(title);

  if (readFile(BLOG_POSTS_DIR, slug)) {
    return Response.json(
      { error: "A blog post with this slug already exists" },
      { status: 409 }
    );
  }

  const fm: Record<string, string> = {
    title,
    type: "blog-post",
    scraped_at: new Date().toISOString().split("T")[0],
    ...frontmatter,
  };

  writeFile(BLOG_POSTS_DIR, slug, fm, body || "");

  return Response.json({ slug, title }, { status: 201 });
}
