import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function getToken(req) {
  try {
    // For API routes
    if (req?.cookies) {
      const token = req.cookies.get("token")?.value;
      if (!token) return null;
      return jwt.verify(token, process.env.JWT_SECRET);
    }

    // For server components
    const token = cookies().get("token")?.value;
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function signOut() {
  cookies().delete("token");
}