import type { NextAuthConfig, User } from "next-auth";
import type { AdapterUser } from "@auth/core/adapters";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface ExtendedUser extends User {
  username: string;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  // adapter: PrismaAdapter(prisma),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    Credentials({
      async authorize(credentials) {
        try {
          const res = await fetch(`http://localhost:3000/api/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: credentials.username }),
          });

          if (!res.ok) {
            throw new Error("ユーザー情報の取得に失敗しました");
          }

          const {
            user: { id, username, password },
          } = await res.json();

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            password as string
          );

          return isPasswordValid ? { id, username, password } : null;
        } catch (error) {
          console.error("認証エラー:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      return isLoggedIn;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/";
    },
    async jwt({ token, trigger, user }) {
      if (trigger === "signIn" && user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (typeof token.user === "object") {
        session.user = token.user as AdapterUser & ExtendedUser;
      }
      return session;
    },
  },
};
