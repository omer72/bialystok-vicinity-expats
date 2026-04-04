import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";

export async function verifyAdmin(): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === password;
}

export function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
