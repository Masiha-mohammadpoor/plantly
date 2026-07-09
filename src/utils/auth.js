import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getToken(req) {
  try {
    // For API routes
    if (req?.cookies) {
      const token = req.cookies.get("token")?.value;
      if (!token) return null;
      return jwt.verify(token, process.env.JWT_SECRET);
    }

    // For server components
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}