import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import LinkedIn from "next-auth/providers/linkedin";
import Google from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { connectMongoDB } from "./lib/db/connect";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(connectMongoDB()),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          role: "USER",
          likes: [],
          saved: [],
          cart: { totalPrice: 0, items: [] },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      },
    }),
  LinkedIn({
    clientId:process.env.AUTH_LINKEDIN_ID,
    clientSecret:process.env.AUTH_LINKEDIN_SECRET
  }),
  Google({
    clientId:process.env.AUTH_GOOGLE_ID,
    clientSecret:process.env.AUTH_GOOGLE_SECRET
  })
  ],
});
